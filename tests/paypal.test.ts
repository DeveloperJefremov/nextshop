import { mock } from 'node:test';
import { generateAccessToken, paypal } from '../lib/paypal';

//Test tot generate access token to paypal
test('Generate access token from PayPal', async () => {
	const tokenResponse = await generateAccessToken();
	console.log('tokenResponse', tokenResponse);
	expect(typeof tokenResponse).toBe('string');
	expect(tokenResponse.length).toBeGreaterThan(0);
});

//Test to create order in paypal
test('creates a paypal order', async () => {
	const token = await generateAccessToken();
	const price = 10.0;

	const orderResponse = await paypal.createOrder(price);
	console.log(orderResponse);

	expect(orderResponse).toHaveProperty('id');
	expect(orderResponse).toHaveProperty('status');
	expect(orderResponse.status).toBe('CREATED');
});

//Test to capture payment in paypal with mock order
test('simulate capturing a payment from an order', async () => {
	const orderId = '100'; // Mock order ID
	const mockCapturePayment = jest
		.spyOn(paypal, 'capturePayment')
		.mockResolvedValue({ status: 'COMPLETED' });
	const captureResponse = await paypal.capturePayment(orderId);
	expect(captureResponse).toHaveProperty('status', 'COMPLETED');
	mockCapturePayment.mockRestore(); // Restore the original function
});
