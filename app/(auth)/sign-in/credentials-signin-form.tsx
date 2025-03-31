'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signInDefaultValues } from '@/lib/constants';
import Link from 'next/link';
import React from 'react';

const CredentialsSignInForm = () => {
	return (
		<form>
			<div className='space-y-6'>
				<Label htmlFor='email'>Email</Label>
				<Input
					id='email'
					name='email'
					type='email'
					required
					autoComplete='email'
					defaultValue={signInDefaultValues.email}
				/>
			</div>
			<div className='space-y-6'>
				<Label htmlFor='password'>Password</Label>
				<Input
					id='password'
					name='password'
					type='password'
					required
					autoComplete='password'
					defaultValue={signInDefaultValues.password}
				/>
			</div>
			<div>
				<Button className='w-full' variant='default'>
					Sign in
				</Button>
			</div>
			<div className='text-sm text-center text-muted-foreground'>
				Don&apos;t have an account?
				<Link href='sign-up' target='_self' className='link'>
					Sign Up
				</Link>
			</div>
		</form>
	);
};

export default CredentialsSignInForm;
