import { generateAccessToken } from '../lib/paypal';

//Test tot generate access token to paypal
test('Generate access token from PayPal', async () => {
	const tokenResponse = await generateAccessToken();
	console.log('tokenResponse', tokenResponse);
	expect(typeof tokenResponse).toBe('string');
	expect(tokenResponse.length).toBeGreaterThan(0);
});
