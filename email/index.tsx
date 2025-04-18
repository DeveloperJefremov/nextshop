import { APP_NAME, SENDER_EMAIL } from '@/lib/constants';
import { Order } from '@/types';
import dotenv from 'dotenv';
import { Resend } from 'resend';
import PurchaseReceiptEmail from './purchase-reciept';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const sendPurchaseReceipt = async ({ order }: { order: Order }) => {
	if (!order.user.email) {
		throw new Error('User email is missing. Cannot send receipt.');
	}

	await resend.emails.send({
		from: `${APP_NAME} <${SENDER_EMAIL}>`,
		to: order.user.email,
		subject: `Order Confirmation ${order.id}`,
		react: <PurchaseReceiptEmail order={order} />,
	});
};
