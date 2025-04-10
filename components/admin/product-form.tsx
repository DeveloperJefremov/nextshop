'use client';

import { useToast } from '@/hooks/use-toast';
import { createProduct, updateProduct } from '@/lib/actions/product.actions';
import { productDefaultValues } from '@/lib/constants';
import { UploadButton } from '@/lib/uploadthing';
import { insertProductSchema, updateProductSchema } from '@/lib/validators';
import { Product } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ControllerRenderProps, SubmitHandler, useForm } from 'react-hook-form';
import slugify from 'slugify';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const ProductForm = ({
	type,
	product,
	productId,
}: {
	type: 'Create' | 'Update';
	product?: Product;
	productId?: string;
}) => {
	const router = useRouter();
	const { toast } = useToast();

	const form = useForm<z.infer<typeof insertProductSchema>>({
		resolver:
			type === 'Update'
				? zodResolver(updateProductSchema)
				: zodResolver(insertProductSchema),
		defaultValues:
			product && type === 'Update' ? product : productDefaultValues,
	});

	return (
		<Form {...form}>
			<form className='space-y-8'>
				<div className='flex flex-col md:flex-row gap-5'>
					{/* Name */}
					{/* Slug */}
				</div>
				<div className='flex flex-col md:flex-row gap-5'>
					{/* Category */}
					{/* Brand */}
				</div>
				<div className='flex flex-col md:flex-row gap-5'>
					{/* Price */}
					{/* Stock */}
				</div>
				<div className='upload-field flex flex-col md:flex-row gap-5'>
					{/* Images */}
				</div>
				<div className='upload-field'>{/* isFeatured */}</div>
				<div>{/* Description */}</div>
				<div>{/* Submit */}</div>
			</form>
		</Form>
	);
};

export default ProductForm;
