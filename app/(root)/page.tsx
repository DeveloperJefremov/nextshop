import ProductCarousel from '@/components/(shared)/product/product-carousel';
import ProductList from '@/components/(shared)/product/product-list';
import ViewAllProductsButton from '@/components/view-all-products-button';
import {
	getFeaturedProducts,
	getLatestProducts,
} from '@/lib/actions/product.actions';

export const metadata = {
	title: 'Home',
	description: 'Modern e-commerce platform built with Next.js',
};
const Homepage = async () => {
	const latestProducts = await getLatestProducts();
	const featuredProducts = await getFeaturedProducts();
	return (
		<>
			{featuredProducts.length > 0 && (
				<ProductCarousel data={featuredProducts} />
			)}
			<ProductList data={latestProducts} title='Newest Arrivals' limit={4} />
			<ViewAllProductsButton />
		</>
	);
};

export default Homepage;
