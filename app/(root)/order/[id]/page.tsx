import { getOrderById } from '@/lib/actions/order.actions';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

export const metadata: Metadata = {
	title: 'Order Details',
	description: 'Order details page',
};

const OrderDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
	const { id } = await props.params;
	const order = await getOrderById(id);

	if (!order) notFound();
	return <>Details</>;
};

export default OrderDetailsPage;
