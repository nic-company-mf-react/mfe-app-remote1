import { CodeBlockClient } from '@nic/mfe-lib-shared/components';
import { useApi } from '@nic/mfe-lib-shared/hooks';
import { SectionCard, LoadingSpinner, ErrorBox, PostItem } from './collectionComponent';
import { RefreshCw } from 'lucide-react';
import { type IPost } from '../../types/post';

export default function BasicUseApiSection(): React.ReactNode {
	const { data, isLoading, isError, error, refetch, isFetching } = useApi<IPost[]>('/posts', { params: { _limit: 3 } });

	return (
		<SectionCard
			badge="Basic"
			badgeColor="blue"
			title="Basic useApi"
			description="컴포넌트가 마운트되면 useApi가 자동으로 GET 요청을 실행합니다."
		>
			<CodeBlockClient
				code={`interface IPost {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export default function SampleComponent(): React.ReactNode {
	// GET 요청 – 컴포넌트 마운트 시 자동 실행
	const { data, isLoading, isError, error } = useApi<IPost[]>(
		'/posts',
		{ params: { _limit: 3 } }
	);

	return (
		<div>
			<h1>Sample Component</h1>
		</div>
	);
}`}
				lang="tsx"
			/>

			<div className="flex items-center justify-between">
				<p className="text-theme-xs text-gray-400 dark:text-gray-500">
					GET https://jsonplaceholder.typicode.com/posts?_limit=3
				</p>
				<button
					onClick={() => refetch()}
					disabled={isFetching}
					className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-theme-xs font-medium text-gray-600 transition hover:border-brand-500 hover:text-brand-500 disabled:opacity-50 dark:border-gray-700 dark:text-gray-400 dark:hover:border-brand-400 dark:hover:text-brand-400"
				>
					<RefreshCw className={`h-3.5 w-3.5 ${isFetching ? 'animate-spin' : ''}`} />
					Refetch
				</button>
			</div>

			<div className="mt-3 space-y-2">
				{isLoading && <LoadingSpinner />}
				{isError && <ErrorBox message={error?.message ?? '알 수 없는 오류'} />}
				{data?.map((post) => (
					<PostItem
						key={post.id}
						post={post}
					/>
				))}
			</div>
		</SectionCard>
	);
}
