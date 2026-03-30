import { Loader2, AlertCircle } from 'lucide-react';

import { type IPost } from '../../types/post';

export function SectionCard({
	badge,
	badgeColor,
	title,
	description,
	children,
}: {
	badge: string;
	badgeColor: 'blue' | 'purple' | 'green' | 'orange';
	title: string;
	description: string;
	children: React.ReactNode;
}) {
	const badgeStyles = {
		blue: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
		purple: 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
		green: 'bg-success-50 text-success-600 dark:bg-success-500/10 dark:text-success-400',
		orange: 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400',
	};

	return (
		<div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
			<div className="border-b border-gray-200 p-5 dark:border-gray-800 lg:p-6">
				<div className="flex items-start gap-3">
					<span
						className={`mt-0.5 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeStyles[badgeColor]}`}
					>
						{badge}
					</span>
					<div>
						<h3 className="text-base font-semibold text-gray-800 dark:text-white/90">{title}</h3>
						<p
							className="mt-0.5 text-theme-sm text-gray-500 dark:text-gray-400"
							dangerouslySetInnerHTML={{ __html: description }}
						/>
					</div>
				</div>
			</div>
			<div className="p-5 lg:p-6">{children}</div>
		</div>
	);
}

export function LoadingSpinner() {
	return (
		<div className="flex items-center justify-center py-10">
			<Loader2 className="h-6 w-6 animate-spin text-brand-500" />
			<span className="ml-2 text-theme-sm text-gray-500 dark:text-gray-400">Loading...</span>
		</div>
	);
}

export function ErrorBox({ message }: { message: string }) {
	return (
		<div className="flex items-start gap-3 rounded-xl border border-error-200 bg-error-50 p-4 dark:border-error-500/20 dark:bg-error-500/5">
			<AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-error-500" />
			<div>
				<p className="text-theme-sm font-medium text-error-600 dark:text-error-400">API 오류</p>
				<p className="mt-0.5 text-theme-xs text-error-500 dark:text-error-400/80">{message}</p>
			</div>
		</div>
	);
}

export function PostItem({ post }: { post: IPost }) {
	return (
		<div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
			<div className="mb-1 flex items-center gap-2">
				<span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-500/10 text-xs font-bold text-brand-600 dark:text-brand-400">
					{post.id}
				</span>
				<p className="line-clamp-1 text-theme-sm font-medium text-gray-800 dark:text-white/90">{post.title}</p>
			</div>
			<p className="line-clamp-2 pl-7 text-theme-xs text-gray-500 dark:text-gray-400">{post.body}</p>
		</div>
	);
}
