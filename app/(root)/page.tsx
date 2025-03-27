import ProductList from '@/components/(shared)/product/product-list';
import { getLatestProducts } from '@/lib/actions/product.actions';

export const metadata = {
	title: 'Home',
	description: 'Modern e-commerce platform built with Next.js',
};
const Homepage = async () => {
	const latestProducts = await getLatestProducts();
	return (
		<>
			<ProductList data={latestProducts} title='Newest Arrivals' limit={4} />
		</>
	);
};

export default Homepage;
