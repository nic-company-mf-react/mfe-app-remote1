import { Outlet } from 'react-router';
import { useSidebar } from '@/shared/context/layout/SidebarContext';
import AppSidebar from './AppSidebar';
import Backdrop from './Backdrop';
import AppHeader from './AppHeader';

export default function LayoutContent(): React.ReactNode {
	const { isExpanded, isHovered, isMobileOpen } = useSidebar();

	return (
		<div className="relative min-h-screen xl:flex bg-gray-50 dark:bg-gray-950">
			<div className="fixed top-0 left-1/2 -translate-x-1/2 z-99999 pointer-events-none">
				<span className="inline-flex items-center gap-1.5 bg-orange-400 dark:bg-orange-500 text-white text-[10px] font-bold px-3 py-0.5 rounded-b-md shadow-md tracking-widest uppercase">
					<span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
					Remote1 · Dev Mode
				</span>
			</div>
			<div>
				<AppSidebar />
				<Backdrop />
			</div>
			<div
				className={`flex-1 transition-all duration-300 ease-in-out ${
					isExpanded || isHovered ? 'lg:ml-[290px]' : 'lg:ml-[90px]'
				} ${isMobileOpen ? 'ml-0' : ''}`}
			>
				<AppHeader />
				<div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
