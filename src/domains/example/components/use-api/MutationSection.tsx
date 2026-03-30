import { useState } from 'react';
import { CodeBlockClient } from '@nic/mfe-lib-shared/components';
import { useApi } from '@nic/mfe-lib-shared/hooks';
import { SectionCard, ErrorBox } from './collectionComponent';
import { Loader2, Send, CheckCircle2 } from 'lucide-react';

import { type IPost } from '../../types/post';

export default function MutationSection() {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [submitted, setSubmitted] = useState(false);

	const { mutate, isPending, data, isSuccess, isError, error } = useApi<IPost, Omit<IPost, 'id'>>('/posts', {
		type: 'mutation',
		method: 'POST',
	});

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!title.trim()) return;
		setSubmitted(true);
		mutate({ userId: 1, title, body });
	}

	return (
		<SectionCard
			badge="mutation"
			badgeColor="orange"
			title="POST mutation — 데이터 생성, 업데이트"
			description="type: 'mutation' 옵션으로 useMutation 기반의 수동 실행 POST 요청을 수행합니다. <br /> 이것은 useApi() 훅의 type 옵션을 'mutation'으로 설정하여 간단하게 사용할 수 있습니다."
		>
			<CodeBlockClient
				code={`// type: 'mutation' 으로 POST 요청 수동 실행
const { mutate, isPending, data, isSuccess } = useApi<
  Post,
  Omit<Post, 'id'>
>('/posts', {
  type: 'mutation',
  method: 'POST',
});

// 실행
mutate({ userId: 1, title: '새 포스트', body: '내용...' });`}
				lang="tsx"
			/>

			<form
				onSubmit={handleSubmit}
				className="mt-4 mb-4 space-y-3"
			>
				<div>
					<label className="mb-1 block text-theme-xs font-medium text-gray-600 dark:text-gray-400">
						Title <span className="text-error-500">*</span>
					</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="포스트 제목을 입력하세요"
						className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-theme-sm text-gray-700 placeholder-gray-400 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white/80 dark:placeholder-gray-500"
					/>
				</div>
				<div>
					<label className="mb-1 block text-theme-xs font-medium text-gray-600 dark:text-gray-400">Body</label>
					<textarea
						value={body}
						onChange={(e) => setBody(e.target.value)}
						placeholder="포스트 내용을 입력하세요"
						rows={3}
						className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-theme-sm text-gray-700 placeholder-gray-400 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white/80 dark:placeholder-gray-500"
					/>
				</div>
				<button
					type="submit"
					disabled={isPending || !title.trim()}
					className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-brand-500 px-4 text-theme-sm font-medium text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
				>
					{isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
					{isPending ? '전송 중...' : '포스트 생성'}
				</button>
			</form>

			{submitted && (
				<div className="space-y-2">
					{isError && <ErrorBox message={error?.message ?? '알 수 없는 오류'} />}
					{isSuccess && data && (
						<div className="rounded-xl border border-success-200 bg-success-50 p-4 dark:border-success-500/20 dark:bg-success-500/5">
							<div className="mb-2 flex items-center gap-2">
								<CheckCircle2 className="h-4 w-4 text-success-500" />
								<span className="text-theme-sm font-medium text-success-600 dark:text-success-400">
									생성 완료 (id: {data.id})
								</span>
							</div>
							<div className="rounded-lg bg-white/60 p-3 dark:bg-gray-900/40">
								<pre className="overflow-x-auto text-xs text-gray-700 dark:text-gray-300">
									{JSON.stringify(data, null, 2)}
								</pre>
							</div>
						</div>
					)}
				</div>
			)}
		</SectionCard>
	);
}
