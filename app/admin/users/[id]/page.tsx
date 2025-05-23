import { getUserById } from '@/lib/actions/user.actions';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { requireAdmin } from '@/lib/auth-guard';
import UpdateUserForm from './update-user-form';

export const metadata: Metadata = {
	title: 'Update User',
};

const AdminUserUpdatePage = async (props: {
	params: Promise<{
		id: string;
	}>;
}) => {
	await requireAdmin();

	const { id } = await props.params;

	const user = await getUserById(id);

	if (!user) notFound();

	return (
		<div className='space-y-8 max-w-lg mx-auto'>
			<h1 className='h2-bold'>Update User</h1>
			{/* <UpdateUserForm user={user} 
			/> */}
			<UpdateUserForm
				user={{
					id: user.id,
					name: user.name ?? '',
					email: user.email ?? '',
					role: user.role,
				}}
			/>
		</div>
	);
};

export default AdminUserUpdatePage;
