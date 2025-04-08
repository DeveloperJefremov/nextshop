import { getOrderById } from '@/lib/actions/order.actions';
import { ShippingAddress } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';
import OrderDetailsTable from './order-details-table';

export const metadata: Metadata = {
	title: 'Order Details',
	description: 'Order details page',
};

const OrderDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
	const { id } = await props.params;

	const order = await getOrderById(id);
	if (!order) notFound();

	return (
		<OrderDetailsTable
			order={{
				...order,
				shippingAddress: order.shippingAddress as ShippingAddress,
			}}
			paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
		/>
	);
};

export default OrderDetailsPage;
