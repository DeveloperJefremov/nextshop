'use client';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import type { Cart, CartItem } from '@/types';
import { LoaderIcon, MinusIcon, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
	const router = useRouter();
	const { toast } = useToast();

	const [isPending, startTransition] = useTransition();

	const handleAddToCart = async () => {
		startTransition(async () => {
			const res = await addItemToCart(item);

			if (!res.success) {
				toast({
					variant: 'destructive',
					description: res.message,
				});
				return;
			}

			//Handle success add to cart
			toast({
				description: res.message,
				action: (
					<ToastAction
						className='bg-primary text-white hover:bg-gray-800'
						altText='Go To Cart'
						onClick={() => router.push('/cart')}
					>
						Go To Cart
					</ToastAction>
				),
			});
		});
	};

	//Handle remove from cart
	const handleRemoveFromCart = async () => {
		startTransition(async () => {
			const res = await removeItemFromCart(item.productId);
			toast({
				variant: res.success ? 'default' : 'destructive',
				description: res.message,
			});
			return;
		});
	};

	//Check if item is in cart
	const existItem =
		cart && cart.items.find(x => x.productId === item.productId);
	return existItem ? (
		<div>
			<Button type='button' variant='outline' onClick={handleRemoveFromCart}>
				{isPending ? (
					<LoaderIcon className='w-4 h-4 animate-spin' />
				) : (
					<MinusIcon className='w-4 h-4' />
				)}
			</Button>
			<span className='px-2'>{existItem.qty}</span>
			<Button type='button' variant='outline' onClick={handleAddToCart}>
				{isPending ? (
					<LoaderIcon className='w-4 h-4 animate-spin' />
				) : (
					<PlusIcon className='w-4 h-4' />
				)}
			</Button>
		</div>
	) : (
		<Button className='w-full' type='button' onClick={handleAddToCart}>
			{isPending ? (
				<LoaderIcon className='w-4 h-4 animate-spin' />
			) : (
				<PlusIcon className='w-4 h-4' />
			)}
			Add to Cart
		</Button>
	);
};
export default AddToCart;
