import React, { useState } from 'react';
//import PageMeta from '@/shared/components/layout/PageMeta';
//import PageBreadcrumb from '@/shared/components/layout/PageBreadcrumb';
import {
	Search,
	Plus,
	ChevronLeft,
	ChevronRight,
	CreditCard,
	CheckCircle,
	XCircle,
	Wallet,
	Eye,
	Pencil,
	Filter,
} from 'lucide-react';

type AccountStatus = 'active' | 'inactive' | 'suspended';
type AccountType = '입출금' | '적금' | '예금' | 'CMA' | '청약';

interface Account {
	id: string;
	accountNo: string;
	holder: string;
	type: AccountType;
	bank: string;
	balance: number;
	status: AccountStatus;
	openDate: string;
}

const MOCK_ACCOUNTS: Account[] = [
	{
		id: '1',
		accountNo: '110-4521-8823-01',
		holder: '김민준',
		type: '입출금',
		bank: '신한은행',
		balance: 15_243_000,
		status: 'active',
		openDate: '2023-01-15',
	},
	{
		id: '2',
		accountNo: '356-7814-9012-34',
		holder: '이서연',
		type: '적금',
		bank: '국민은행',
		balance: 5_000_000,
		status: 'active',
		openDate: '2023-03-22',
	},
	{
		id: '3',
		accountNo: '240-9901-1122-55',
		holder: '박도현',
		type: '예금',
		bank: '하나은행',
		balance: 30_000_000,
		status: 'inactive',
		openDate: '2022-11-08',
	},
	{
		id: '4',
		accountNo: '083-4411-7700-02',
		holder: '최지아',
		type: 'CMA',
		bank: '우리은행',
		balance: 8_750_000,
		status: 'active',
		openDate: '2024-02-01',
	},
	{
		id: '5',
		accountNo: '612-3300-5544-88',
		holder: '정유진',
		type: '청약',
		bank: '농협은행',
		balance: 2_400_000,
		status: 'suspended',
		openDate: '2021-07-30',
	},
	{
		id: '6',
		accountNo: '110-8899-4423-07',
		holder: '한지훈',
		type: '입출금',
		bank: '신한은행',
		balance: 490_000,
		status: 'active',
		openDate: '2024-05-10',
	},
	{
		id: '7',
		accountNo: '356-6677-0034-19',
		holder: '오수빈',
		type: '적금',
		bank: '국민은행',
		balance: 1_200_000,
		status: 'inactive',
		openDate: '2023-09-18',
	},
	{
		id: '8',
		accountNo: '240-2200-8811-33',
		holder: '임채원',
		type: '예금',
		bank: '하나은행',
		balance: 50_000_000,
		status: 'active',
		openDate: '2022-04-25',
	},
	{
		id: '9',
		accountNo: '083-1199-3322-66',
		holder: '신예은',
		type: '입출금',
		bank: '우리은행',
		balance: 3_670_000,
		status: 'active',
		openDate: '2023-12-03',
	},
	{
		id: '10',
		accountNo: '612-4455-9900-11',
		holder: '강준서',
		type: 'CMA',
		bank: '농협은행',
		balance: 12_000_000,
		status: 'suspended',
		openDate: '2021-02-14',
	},
];

const STATUS_CONFIG: Record<AccountStatus, { label: string; className: string }> = {
	active: {
		label: '활성',
		className:
			'inline-flex items-center gap-1 rounded-full bg-success-500/10 px-2.5 py-0.5 text-xs font-medium text-success-600 dark:text-success-400',
	},
	inactive: {
		label: '비활성',
		className:
			'inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400',
	},
	suspended: {
		label: '정지',
		className:
			'inline-flex items-center gap-1 rounded-full bg-error-500/10 px-2.5 py-0.5 text-xs font-medium text-error-600 dark:text-error-400',
	},
};

const TYPE_CONFIG: Record<AccountType, string> = {
	입출금: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400',
	적금: 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
	예금: 'bg-blue-light-50 text-blue-light-600 dark:bg-blue-light-500/10 dark:text-blue-light-400',
	CMA: 'bg-warning-50 text-warning-600 dark:bg-warning-500/10 dark:text-warning-400',
	청약: 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400',
};

function formatBalance(amount: number): string {
	return amount.toLocaleString('ko-KR') + '원';
}

function StatusDot({ status }: { status: AccountStatus }) {
	const colors: Record<AccountStatus, string> = {
		active: 'bg-success-500',
		inactive: 'bg-gray-400',
		suspended: 'bg-error-500',
	};
	return <span className={`inline-block h-1.5 w-1.5 rounded-full ${colors[status]}`} />;
}

export default function AccountIndex(): React.ReactNode {
	const [searchQuery, setSearchQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState<AccountStatus | 'all'>('all');
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 7;

	const filtered = MOCK_ACCOUNTS.filter((acc) => {
		const matchSearch =
			searchQuery === '' ||
			acc.holder.includes(searchQuery) ||
			acc.accountNo.includes(searchQuery) ||
			acc.bank.includes(searchQuery);
		const matchStatus = statusFilter === 'all' || acc.status === statusFilter;
		return matchSearch && matchStatus;
	});

	const totalPages = Math.ceil(filtered.length / pageSize);
	const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

	const totalBalance = MOCK_ACCOUNTS.reduce((s, a) => s + a.balance, 0);
	const activeCount = MOCK_ACCOUNTS.filter((a) => a.status === 'active').length;
	const inactiveCount = MOCK_ACCOUNTS.filter((a) => a.status === 'inactive').length;
	const suspendedCount = MOCK_ACCOUNTS.filter((a) => a.status === 'suspended').length;

	const statCards = [
		{
			label: '전체 계좌',
			value: MOCK_ACCOUNTS.length + '개',
			icon: CreditCard,
			iconBg: 'bg-brand-50 dark:bg-brand-500/10',
			iconColor: 'text-brand-500',
		},
		{
			label: '활성 계좌',
			value: activeCount + '개',
			icon: CheckCircle,
			iconBg: 'bg-success-50 dark:bg-success-500/10',
			iconColor: 'text-success-500',
		},
		{
			label: '비활성 / 정지',
			value: inactiveCount + suspendedCount + '개',
			icon: XCircle,
			iconBg: 'bg-error-50 dark:bg-error-500/10',
			iconColor: 'text-error-500',
		},
		{
			label: '총 잔액',
			value: formatBalance(totalBalance),
			icon: Wallet,
			iconBg: 'bg-warning-50 dark:bg-warning-500/10',
			iconColor: 'text-warning-500',
		},
	];

	return (
		<>
			{/*<PageMeta
				title="rm-app-boilerplate | account-list"
				description="계좌 목록 페이지"
			/>
			<PageBreadcrumb pageTitle="Account List" />*/}

			{/* 요약 통계 카드 */}
			<div className="mb-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
				{statCards.map((card) => {
					const Icon = card.icon;
					return (
						<div
							key={card.label}
							className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3"
						>
							<div className="flex items-center justify-between">
								<div>
									<p className="mb-1 text-theme-sm text-gray-500 dark:text-gray-400">{card.label}</p>
									<p className="text-xl font-bold text-gray-800 dark:text-white/90">{card.value}</p>
								</div>
								<div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.iconBg}`}>
									<Icon className={`h-5 w-5 ${card.iconColor}`} />
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{/* 계좌 목록 테이블 */}
			<div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
				{/* 테이블 헤더 */}
				<div className="flex flex-col gap-3 border-b border-gray-200 p-5 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between lg:p-6">
					<div>
						<h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">계좌 목록</h3>
						<p className="mt-0.5 text-theme-sm text-gray-500 dark:text-gray-400">
							총 {filtered.length}개의 계좌가 등록되어 있습니다.
						</p>
					</div>
					<div className="flex flex-wrap items-center gap-2">
						{/* 검색창 */}
						<div className="relative">
							<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
							<input
								type="text"
								placeholder="예금주 / 계좌번호 / 은행 검색"
								value={searchQuery}
								onChange={(e) => {
									setSearchQuery(e.target.value);
									setCurrentPage(1);
								}}
								className="h-9 w-56 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-theme-sm text-gray-700 placeholder-gray-400 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white/80 dark:placeholder-gray-500 dark:focus:bg-gray-900"
							/>
						</div>
						{/* 상태 필터 */}
						<div className="relative">
							<Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
							<select
								value={statusFilter}
								onChange={(e) => {
									setStatusFilter(e.target.value as AccountStatus | 'all');
									setCurrentPage(1);
								}}
								className="h-9 w-32 appearance-none rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-6 text-theme-sm text-gray-700 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white/80 dark:focus:bg-gray-900"
							>
								<option value="all">전체 상태</option>
								<option value="active">활성</option>
								<option value="inactive">비활성</option>
								<option value="suspended">정지</option>
							</select>
						</div>
						{/* 계좌 등록 버튼 */}
						<button className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-brand-500 px-4 text-theme-sm font-medium text-white transition hover:bg-brand-600 active:bg-brand-700">
							<Plus className="h-4 w-4" />
							계좌 등록
						</button>
					</div>
				</div>

				{/* 테이블 */}
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-gray-200 dark:border-gray-800">
								<th className="px-5 py-3.5 text-left text-theme-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500 lg:px-6">
									계좌번호
								</th>
								<th className="px-5 py-3.5 text-left text-theme-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
									예금주
								</th>
								<th className="px-5 py-3.5 text-left text-theme-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
									계좌 유형
								</th>
								<th className="px-5 py-3.5 text-left text-theme-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
									은행
								</th>
								<th className="px-5 py-3.5 text-right text-theme-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
									잔액
								</th>
								<th className="px-5 py-3.5 text-center text-theme-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
									상태
								</th>
								<th className="px-5 py-3.5 text-left text-theme-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
									개설일
								</th>
								<th className="px-5 py-3.5 text-center text-theme-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500 lg:px-6">
									관리
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100 dark:divide-gray-800">
							{paginated.length === 0 ? (
								<tr>
									<td
										colSpan={8}
										className="py-12 text-center text-theme-sm text-gray-400 dark:text-gray-600"
									>
										검색 결과가 없습니다.
									</td>
								</tr>
							) : (
								paginated.map((account) => {
									const statusCfg = STATUS_CONFIG[account.status];
									return (
										<tr
											key={account.id}
											className="group transition-colors hover:bg-gray-50 dark:hover:bg-white/3"
										>
											<td className="px-5 py-4 lg:px-6">
												<span className="font-mono text-theme-sm text-gray-700 dark:text-white/80">
													{account.accountNo}
												</span>
											</td>
											<td className="px-5 py-4">
												<div className="flex items-center gap-2.5">
													<div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/10 text-theme-xs font-semibold text-brand-600 dark:text-brand-400">
														{account.holder.charAt(0)}
													</div>
													<span className="text-theme-sm font-medium text-gray-800 dark:text-white/90">
														{account.holder}
													</span>
												</div>
											</td>
											<td className="px-5 py-4">
												<span
													className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${TYPE_CONFIG[account.type]}`}
												>
													{account.type}
												</span>
											</td>
											<td className="px-5 py-4">
												<span className="text-theme-sm text-gray-600 dark:text-gray-400">{account.bank}</span>
											</td>
											<td className="px-5 py-4 text-right">
												<span className="text-theme-sm font-semibold text-gray-800 dark:text-white/90">
													{formatBalance(account.balance)}
												</span>
											</td>
											<td className="px-5 py-4 text-center">
												<span className={statusCfg.className}>
													<StatusDot status={account.status} />
													{statusCfg.label}
												</span>
											</td>
											<td className="px-5 py-4">
												<span className="text-theme-sm text-gray-500 dark:text-gray-400">{account.openDate}</span>
											</td>
											<td className="px-5 py-4 text-center lg:px-6">
												<div className="flex items-center justify-center gap-1.5">
													<button
														title="상세 보기"
														className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-brand-500 dark:hover:bg-gray-800 dark:hover:text-brand-400"
													>
														<Eye className="h-4 w-4" />
													</button>
													<button
														title="수정"
														className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-brand-500 dark:hover:bg-gray-800 dark:hover:text-brand-400"
													>
														<Pencil className="h-4 w-4" />
													</button>
												</div>
											</td>
										</tr>
									);
								})
							)}
						</tbody>
					</table>
				</div>

				{/* 페이지네이션 */}
				{totalPages > 1 && (
					<div className="flex items-center justify-between border-t border-gray-200 px-5 py-4 dark:border-gray-800 lg:px-6">
						<p className="text-theme-sm text-gray-500 dark:text-gray-400">
							{(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filtered.length)} / 전체{' '}
							{filtered.length}건
						</p>
						<div className="flex items-center gap-1">
							<button
								onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
								disabled={currentPage === 1}
								className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-brand-500 hover:text-brand-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-400 dark:hover:border-brand-400 dark:hover:text-brand-400"
							>
								<ChevronLeft className="h-4 w-4" />
							</button>
							{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
								<button
									key={page}
									onClick={() => setCurrentPage(page)}
									className={`flex h-8 w-8 items-center justify-center rounded-lg text-theme-sm font-medium transition ${
										page === currentPage
											? 'bg-brand-500 text-white'
											: 'border border-gray-200 text-gray-600 hover:border-brand-500 hover:text-brand-500 dark:border-gray-700 dark:text-gray-400 dark:hover:border-brand-400 dark:hover:text-brand-400'
									}`}
								>
									{page}
								</button>
							))}
							<button
								onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
								disabled={currentPage === totalPages}
								className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-brand-500 hover:text-brand-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-400 dark:hover:border-brand-400 dark:hover:text-brand-400"
							>
								<ChevronRight className="h-4 w-4" />
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
