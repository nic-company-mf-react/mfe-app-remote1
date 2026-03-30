import { useState } from 'react';
import { useApi } from '@nic/mfe-lib-shared/hooks';
import { SectionCard, LoadingSpinner, ErrorBox, PostItem } from './collectionComponent';
import { Loader2, Play } from 'lucide-react';

import { CodeBlockClient } from '@nic/mfe-lib-shared/components';

import { type IPost } from '../../types/post';

export default function ParamsSection(): React.ReactNode {
	const [userId, setUserId] = useState<number>(1);
	const [inputVal, setInputVal] = useState('1');

	const { data, isLoading, isError, error, isFetching } = useApi<IPost[]>('/posts', {
		params: { userId, _limit: 4 },
	});

	function handleFetch() {
		const parsed = parseInt(inputVal, 10);
		if (!isNaN(parsed) && parsed > 0) {
			setUserId(parsed);
		}
	}

	return (
		<SectionCard
			badge="params"
			badgeColor="purple"
			title="params 옵션으로 쿼리스트링 전달"
			description="useApi의 params 옵션을 사용하여 GET 요청에 쿼리스트링을 자동으로 추가합니다. userId가 없으면 호출하지 않고, userId가 변경이 되면 자동으로 호출합니다."
		>
			<CodeBlockClient
				code={`// params 옵션으로 쿼리스트링 전달
// userId=1 인 포스트만 필터링
const { data, isLoading } = useApi<Post[]>(
  '/posts',
  {
    params: { userId, _limit: 4 },
    queryOptions: { enabled: !!userId }, // userId가 없으면 호출안함.
  }
);`}
				lang="tsx"
			/>

			<div className="mt-4 mb-4 flex items-center gap-2">
				<label className="text-theme-sm font-medium text-gray-600 dark:text-gray-400">userId</label>
				<input
					type="number"
					min={1}
					max={10}
					value={inputVal}
					onChange={(e) => setInputVal(e.target.value)}
					onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
					className="h-9 w-24 rounded-lg border border-gray-200 bg-gray-50 px-3 text-theme-sm text-gray-700 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white/80"
				/>
				<button
					onClick={handleFetch}
					disabled={isFetching}
					className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-brand-500 px-4 text-theme-sm font-medium text-white transition hover:bg-brand-600 disabled:opacity-60"
				>
					{isFetching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
					조회
				</button>
				<span className="text-theme-xs text-gray-400 dark:text-gray-500">?userId={userId}&_limit=4</span>
			</div>

			<div className="space-y-2">
				{isLoading && <LoadingSpinner />}
				{isError && <ErrorBox message={error?.message ?? '알 수 없는 오류'} />}
				{!isLoading && !isError && data?.length === 0 && (
					<p className="py-6 text-center text-theme-sm text-gray-400">데이터가 없습니다.</p>
				)}
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
