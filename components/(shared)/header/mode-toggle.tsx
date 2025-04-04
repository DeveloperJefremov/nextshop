'use client';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoonIcon, SunIcon, SunMoonIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ModeToggle = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant='ghost'
						className='focus-visible:ring-0 focus-visible:ring-offset-0'
					>
						{theme === 'system' ? (
							<SunMoonIcon />
						) : theme === 'dark' ? (
							<MoonIcon />
						) : (
							<SunIcon />
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Appearance</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuCheckboxItem
						checked={theme === 'system'}
						onCheckedChange={() => setTheme('system')}
					>
						System
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						checked={theme === 'dark'}
						onCheckedChange={() => setTheme('dark')}
					>
						Dark
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						checked={theme === 'light'}
						onCheckedChange={() => setTheme('light')}
					>
						Light
					</DropdownMenuCheckboxItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default ModeToggle;
