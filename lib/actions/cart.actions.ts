'use server';
import { auth } from '@/auth';
import { CartItem } from '@/types';
import { cookies } from 'next/headers';
import { formatError } from '../utils';

export async function addItemToCart(data: CartItem) {
	try {
		// Check for cart cookie
		const sessionCartId = (await cookies()).get('sessionCartId')?.value;
		if (!sessionCartId) throw new Error('Cart session not found');

		//Get session and user ID
		const session = await auth();
		const userId = session?.user?.id ? (session.user.id as string) : undefined;

		//Testing
		console.log({ 'Session Cart ID': sessionCartId, 'User  ID': userId });
		return {
			success: true,
			message: 'Item added to cart',
		};
	} catch (error) {
		return {
			success: false,
			message: formatError(error),
		};
	}
}
