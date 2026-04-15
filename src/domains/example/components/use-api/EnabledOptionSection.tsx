import { useState } from 'react';
import { useApi } from '@axiom/mfe-lib-shared/hooks';
import { SectionCard, LoadingSpinner, PostItem } from './collectionComponent';
import { Loader2, Play } from 'lucide-react';

import { CodeBlockClient } from '@axiom/mfe-lib-shared/components';

import { type IPost } from '../../types/post';

export default function EnabledOptionSection() {
	const [enabled, setEnabled] = useState(false);

	const { data, isLoading, isFetching } = useApi<IPost[]>('/posts', {
		params: { _limit: 5 },
		queryOptions: { enabled },
	});

	return (
		<SectionCard
			badge="enabled"
			badgeColor="green"
			title="enabled 옵션으로 API 호출 제어"
			description="enabled 옵션이 false이면 API를 호출하지 않습니다. 이벤트 발생 시점에 fetch를 실행할 수 있습니다. 또는 다른 방법으로 enabled: false로 설정하고 refetch() 메서드를 호출하여 호출할 수 있습니다."
		>
			<CodeBlockClient
				code={`// enabled 옵션을 사용하여 버튼 클릭 시에만 API 요청 실행
const [enabled, setEnabled] = useState(false);

const { data, isLoading, isFetching } = useApi<Post[]>(
  '/posts',
  {
    params: { _limit: 5 },
    queryOptions: { enabled },
  }
);

// 버튼 클릭 시 enabled = true 로 변경 → 즉시 fetch 실행
<button onClick={() => setEnabled(true)}>Fetch</button>`}
				lang="tsx"
			/>

			<div className="mt-4 mb-4 flex items-center gap-3">
				<button
					onClick={() => setEnabled(true)}
					disabled={enabled || isFetching}
					className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-success-500 px-4 text-theme-sm font-medium text-white transition hover:bg-success-600 disabled:cursor-not-allowed disabled:opacity-60"
				>
					{isFetching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
					Fetch
				</button>
				<button
					onClick={() => setEnabled(false)}
					disabled={!enabled}
					className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 px-4 text-theme-sm font-medium text-gray-600 transition hover:border-error-400 hover:text-error-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-400"
				>
					Reset
				</button>
				<span
					className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
						enabled
							? 'bg-success-50 text-success-600 dark:bg-success-500/10 dark:text-success-400'
							: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
					}`}
				>
					<span className={`inline-block h-1.5 w-1.5 rounded-full ${enabled ? 'bg-success-500' : 'bg-gray-400'}`} />
					enabled: {String(enabled)}
				</span>
			</div>

			<div className="space-y-2">
				{!enabled && !data && (
					<div className="flex items-center justify-center rounded-xl border border-dashed border-gray-200 py-10 dark:border-gray-700">
						<p className="text-theme-sm text-gray-400 dark:text-gray-500">버튼을 클릭하면 API를 호출합니다.</p>
					</div>
				)}
				{isLoading && <LoadingSpinner />}
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
