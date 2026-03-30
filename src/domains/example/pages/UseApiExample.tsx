import BasicUseApiSection from '../components/use-api/BasicUseApiSection';
import ParamsSection from '../components/use-api/ParamsSection';
import EnabledOptionSection from '../components/use-api/EnabledOptionSection';
import MutationSection from '../components/use-api/MutationSection';

export default function UseApiExample(): React.ReactNode {
	return (
		<>
			{/* 페이지 헤더 */}
			<div className="mb-6">
				<div className="flex items-center gap-2">
					<h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">useApi</h1>
					<span className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
						@nic/mfe-lib-shared
					</span>
				</div>
				<p className="mt-1.5 text-theme-sm text-gray-500 dark:text-gray-400">
					<strong className="font-medium text-gray-700 dark:text-white/70">TanStack Query(React Query)</strong> 기반으로
					구축된 <strong className="font-medium text-gray-700 dark:text-white/70">REST API 호출용 커스텀 훅</strong>
					입니다.
				</p>
				{/* import 코드 */}
				<div className="mt-3 inline-block rounded-lg bg-gray-900 px-4 py-2 dark:bg-gray-950">
					<code className="text-xs text-gray-100">
						<span className="text-purple-400">import</span>
						<span className="text-white"> {'{ '}</span>
						<span className="text-yellow-300">useApi</span>
						<span className="text-white">{' }'}</span>
						<span className="text-purple-400"> from </span>
						<span className="text-green-300">'@nic/mfe-lib-shared/hooks'</span>
						<span className="text-white">;</span>
					</code>
				</div>
			</div>

			{/* 가이드 문서 링크 */}
			<div className="mt-4 mb-6">
				<a
					href="http://redsky0212.dothome.co.kr/2026/mfe-multirepo/guide/docs/apis/"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-1.5 text-theme-sm text-brand-600 hover:text-brand-700 hover:underline dark:text-brand-400 dark:hover:text-brand-300"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
						<polyline points="15 3 21 3 21 9" />
						<line
							x1="10"
							y1="14"
							x2="21"
							y2="3"
						/>
					</svg>
					useApi() 훅 공식 문서 보기
				</a>
			</div>

			{/* 섹션들 */}
			<div className="space-y-6">
				<BasicUseApiSection />
				<ParamsSection />
				<EnabledOptionSection />
				<MutationSection />
			</div>
		</>
	);
}
