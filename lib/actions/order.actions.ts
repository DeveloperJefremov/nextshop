'use server';

import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { CartItem } from '@/types';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { formatError } from '../utils';
import { insertOrderSchema } from '../validators';
import { getMyCart } from './cart.actions';
import { getUserById } from './user.actions';

// Create order and create order items
export async function createOrder() {
	try {
		const session = await auth();
		if (!session) throw new Error('User not authenticated');
		const cart = await getMyCart();
		const userId = session?.user?.id;
		if (!userId) throw new Error('User ID not found in session');

		const user = await getUserById(userId);

		if (!cart || cart.items.length === 0) {
			return {
				success: false,
				error: 'Your cart is empty',
				redirectTo: '/cart',
			};
		}
		if (!user.address) {
			return {
				success: false,
				error: 'No shipping address',
				redirectTo: '/shipping-address',
			};
		}
		if (!user.paymentMethod) {
			return {
				success: false,
				error: 'No payment method',
				redirectTo: '/payment-method',
			};
		}

		//Create order object
		const order = insertOrderSchema.parse({
			userId: userId,
			shippingAddress: user.address,
			paymentMethod: user.paymentMethod,
			itemsPrice: cart.itemsPrice,
			shippingPrice: cart.shippingPrice,
			taxPrice: cart.taxPrice,
			totalPrice: cart.totalPrice,
		});
		//Create a transaction to create order and order items in database
		const insertedOrderId: string = await prisma.$transaction(async tx => {
			//Create order in database
			const insertedOrder = await tx.order.create({ data: order });
			//Create order items from the cart items
			for (const item of cart.items as CartItem[]) {
				await tx.orderItem.create({
					data: {
						...item,
						price: item.price,
						orderId: insertedOrder.id,
					},
				});
			}
			//Clear cart
			await tx.cart.update({
				where: { id: cart.id },
				data: {
					items: [],
					totalPrice: 0,
					taxPrice: 0,
					shippingPrice: 0,
					itemsPrice: 0,
				},
			});
			return insertedOrderId;
		});

		if (!insertedOrderId) throw new Error('Order not created');
		return {
			success: true,
			message: 'Order created',
			redirectTo: `/order/${insertedOrderId}`,
		};
	} catch (error) {
		if (isRedirectError(error)) throw error;
		return { success: false, error: formatError(error) };
	}
}
