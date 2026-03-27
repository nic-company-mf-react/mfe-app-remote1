import { useState } from 'react';
import {
	ArrowUpRight,
	ArrowDownLeft,
	Receipt,
	Globe,
	Wallet,
	CreditCard,
	Shield,
	Gift,
	Bell,
	ChevronRight,
	TrendingUp,
	TrendingDown,
	RefreshCw,
	Eye,
	EyeOff,
	MoreHorizontal,
	Banknote,
	PiggyBank,
	Building2,
} from 'lucide-react';

/* ─────────────────────────── 목업 데이터 ─────────────────────────── */
const accounts = [
	{
		id: 1,
		name: '주거래 통장',
		accountNo: '110-123-456789',
		balance: 3_842_750,
		type: '입출금',
		icon: Banknote,
	},
	{
		id: 2,
		name: '자유 적금',
		accountNo: '110-987-654321',
		balance: 15_200_000,
		type: '적금',
		icon: PiggyBank,
	},
	{
		id: 3,
		name: '청약 저축',
		accountNo: '110-111-222333',
		balance: 8_500_000,
		type: '저축',
		icon: Building2,
	},
];

const transactions = [
	{
		id: 1,
		name: '스타벅스',
		date: '오늘 09:24',
		amount: -6_500,
		category: '식비',
		emoji: '☕',
	},
	{
		id: 2,
		name: '급여 입금',
		date: '어제 09:00',
		amount: 3_200_000,
		category: '급여',
		emoji: '💰',
	},
	{
		id: 3,
		name: '이마트',
		date: '3월 24일',
		amount: -45_800,
		category: '쇼핑',
		emoji: '🛒',
	},
	{
		id: 4,
		name: 'Netflix',
		date: '3월 23일',
		amount: -17_000,
		category: '구독',
		emoji: '🎬',
	},
	{
		id: 5,
		name: '공과금 납부',
		date: '3월 22일',
		amount: -89_340,
		category: '납부',
		emoji: '🏠',
	},
];

const quickActions = [
	{ name: '이체', Icon: ArrowUpRight, bg: 'bg-blue-50 dark:bg-blue-950/40', color: 'text-blue-600 dark:text-blue-400' },
	{
		name: '조회',
		Icon: Receipt,
		bg: 'bg-emerald-50 dark:bg-emerald-950/40',
		color: 'text-emerald-600 dark:text-emerald-400',
	},
	{
		name: '납부',
		Icon: Wallet,
		bg: 'bg-orange-50 dark:bg-orange-950/40',
		color: 'text-orange-500 dark:text-orange-400',
	},
	{
		name: '환전',
		Icon: Globe,
		bg: 'bg-purple-50 dark:bg-purple-950/40',
		color: 'text-purple-600 dark:text-purple-400',
	},
	{ name: '적금', Icon: PiggyBank, bg: 'bg-pink-50 dark:bg-pink-950/40', color: 'text-pink-600 dark:text-pink-400' },
	{
		name: '대출',
		Icon: CreditCard,
		bg: 'bg-indigo-50 dark:bg-indigo-950/40',
		color: 'text-indigo-600 dark:text-indigo-400',
	},
	{ name: '보험', Icon: Shield, bg: 'bg-teal-50 dark:bg-teal-950/40', color: 'text-teal-600 dark:text-teal-400' },
	{ name: '혜택', Icon: Gift, bg: 'bg-red-50 dark:bg-red-950/40', color: 'text-red-500 dark:text-red-400' },
];

const notices = [
	'[필독] 보이스피싱 예방 안내 — 직원은 절대 개인정보를 요구하지 않습니다.',
	'[이벤트] 3월 급여이체 고객 스타벅스 쿠폰 증정!',
	'[공지] 시스템 점검 안내 (3/30 02:00 ~ 04:00)',
];

/* ─────────────────────────── 유틸 ─────────────────────────── */
const formatKRW = (n: number) => new Intl.NumberFormat('ko-KR').format(Math.abs(n));

const getDayOfWeek = () => {
	const days = ['일', '월', '화', '수', '목', '금', '토'];
	return days[new Date().getDay()];
};

/* ─────────────────────────── 컴포넌트 ─────────────────────────── */

export default function MainIndex(): React.ReactNode {
	const [selectedAccount, setSelectedAccount] = useState(0);
	const [balanceVisible, setBalanceVisible] = useState(true);
	const [noticeIdx, setNoticeIdx] = useState(0);

	const today = new Date();
	const dateStr = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 (${getDayOfWeek()})`;
	const account = accounts[selectedAccount];

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-5 lg:px-6 lg:py-6 space-y-5 max-w-screen-xl mx-auto">
			{/* ── 앱 식별 뱃지 ── */}
			<div className="flex items-center gap-2">
				<span className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm tracking-wide">
					<span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
					Remote1 App
				</span>
				<span className="text-xs text-gray-400 dark:text-gray-500">개인뱅킹 서비스</span>
			</div>

			{/* ── 상단 인사 영역 ── */}
			<div className="flex items-center justify-between">
				<div>
					<p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">{dateStr}</p>
					<h1 className="text-lg font-bold text-gray-900 dark:text-white">
						안녕하세요, <span className="text-blue-600 dark:text-blue-400">홍길동</span> 고객님 👋
					</h1>
				</div>
				<button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-theme-xs border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
					<Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />
					<span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-800" />
				</button>
			</div>

			{/* ── 공지 배너 ── */}
			<div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-xl px-4 py-2.5">
				<span className="shrink-0 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/60 px-2 py-0.5 rounded-full">
					공지
				</span>
				<p className="flex-1 text-xs text-blue-700 dark:text-blue-300 truncate">{notices[noticeIdx]}</p>
				<div className="flex items-center gap-1 shrink-0">
					{notices.map((_, i) => (
						<button
							key={i}
							onClick={() => setNoticeIdx(i)}
							className={`w-1.5 h-1.5 rounded-full transition-colors ${
								i === noticeIdx ? 'bg-blue-500' : 'bg-blue-200 dark:bg-blue-800'
							}`}
						/>
					))}
				</div>
			</div>

			{/* ── 메인 계좌 카드 ── */}
			<div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 p-5 text-white shadow-lg">
				{/* 배경 장식 */}
				<div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
				<div className="absolute bottom-0 left-0 w-28 h-28 bg-white/5 rounded-full translate-y-12 -translate-x-10" />

				{/* 계좌 선택 탭 */}
				<div className="flex gap-2 mb-4 relative z-10">
					{accounts.map((acc, idx) => (
						<button
							key={acc.id}
							onClick={() => setSelectedAccount(idx)}
							className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
								idx === selectedAccount
									? 'bg-white text-blue-700 shadow-sm'
									: 'bg-white/15 text-white/80 hover:bg-white/25'
							}`}
						>
							{acc.name}
						</button>
					))}
				</div>

				{/* 잔액 표시 */}
				<div className="relative z-10">
					<div className="flex items-center gap-2 mb-1">
						<span className="text-sm text-white/70">{account.accountNo}</span>
						<button
							onClick={() => setBalanceVisible((v) => !v)}
							className="text-white/60 hover:text-white transition-colors"
						>
							{balanceVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
						</button>
					</div>
					<div className="flex items-end gap-1.5 mb-4">
						{balanceVisible ? (
							<>
								<span className="text-3xl font-bold tracking-tight">{formatKRW(account.balance)}</span>
								<span className="text-lg font-medium text-white/80 mb-0.5">원</span>
							</>
						) : (
							<span className="text-3xl font-bold tracking-widest">••••••</span>
						)}
					</div>

					{/* 빠른 버튼 */}
					<div className="flex gap-2">
						<button className="flex-1 flex items-center justify-center gap-1.5 bg-white/15 hover:bg-white/25 rounded-xl py-2.5 text-sm font-medium transition-all backdrop-blur-sm border border-white/10">
							<ArrowUpRight className="w-4 h-4" />
							이체
						</button>
						<button className="flex-1 flex items-center justify-center gap-1.5 bg-white/15 hover:bg-white/25 rounded-xl py-2.5 text-sm font-medium transition-all backdrop-blur-sm border border-white/10">
							<ArrowDownLeft className="w-4 h-4" />
							입금
						</button>
						<button className="flex-1 flex items-center justify-center gap-1.5 bg-white/15 hover:bg-white/25 rounded-xl py-2.5 text-sm font-medium transition-all backdrop-blur-sm border border-white/10">
							<RefreshCw className="w-4 h-4" />
							자동이체
						</button>
						<button className="flex items-center justify-center w-10 bg-white/15 hover:bg-white/25 rounded-xl transition-all backdrop-blur-sm border border-white/10">
							<MoreHorizontal className="w-4 h-4" />
						</button>
					</div>
				</div>
			</div>

			{/* ── 전체 자산 요약 ── */}
			<div className="grid grid-cols-3 gap-3">
				<div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-theme-xs border border-gray-100 dark:border-gray-700">
					<p className="text-xs text-gray-400 dark:text-gray-500 mb-1">총 자산</p>
					<p className="text-base font-bold text-gray-900 dark:text-white">
						{formatKRW(accounts.reduce((s, a) => s + a.balance, 0))}
						<span className="text-xs font-normal text-gray-400 ml-0.5">원</span>
					</p>
					<div className="flex items-center gap-0.5 mt-1">
						<TrendingUp className="w-3 h-3 text-emerald-500" />
						<span className="text-xs text-emerald-500">+2.3%</span>
					</div>
				</div>
				<div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-theme-xs border border-gray-100 dark:border-gray-700">
					<p className="text-xs text-gray-400 dark:text-gray-500 mb-1">이달 지출</p>
					<p className="text-base font-bold text-gray-900 dark:text-white">
						{formatKRW(158_640)}
						<span className="text-xs font-normal text-gray-400 ml-0.5">원</span>
					</p>
					<div className="flex items-center gap-0.5 mt-1">
						<TrendingDown className="w-3 h-3 text-red-400" />
						<span className="text-xs text-red-400">-5.1%</span>
					</div>
				</div>
				<div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-theme-xs border border-gray-100 dark:border-gray-700">
					<p className="text-xs text-gray-400 dark:text-gray-500 mb-1">이달 수입</p>
					<p className="text-base font-bold text-gray-900 dark:text-white">
						{formatKRW(3_200_000)}
						<span className="text-xs font-normal text-gray-400 ml-0.5">원</span>
					</p>
					<div className="flex items-center gap-0.5 mt-1">
						<TrendingUp className="w-3 h-3 text-emerald-500" />
						<span className="text-xs text-emerald-500">급여 입금</span>
					</div>
				</div>
			</div>

			{/* ── 빠른 서비스 ── */}
			<div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-theme-xs border border-gray-100 dark:border-gray-700">
				<h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">빠른 서비스</h2>
				<div className="grid grid-cols-4 gap-y-4">
					{quickActions.map(({ name, Icon, bg, color }) => (
						<button
							key={name}
							className="flex flex-col items-center gap-1.5 group"
						>
							<div
								className={`w-12 h-12 flex items-center justify-center rounded-2xl ${bg} group-hover:scale-105 transition-transform`}
							>
								<Icon className={`w-5 h-5 ${color}`} />
							</div>
							<span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{name}</span>
						</button>
					))}
				</div>
			</div>

			{/* ── 최근 거래 내역 ── */}
			<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-theme-xs border border-gray-100 dark:border-gray-700 overflow-hidden">
				<div className="flex items-center justify-between px-4 pt-4 pb-3">
					<h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">최근 거래 내역</h2>
					<button className="flex items-center gap-0.5 text-xs text-blue-500 dark:text-blue-400 font-medium hover:underline">
						전체보기 <ChevronRight className="w-3 h-3" />
					</button>
				</div>
				<ul className="divide-y divide-gray-50 dark:divide-gray-700/50">
					{transactions.map((tx) => (
						<li
							key={tx.id}
							className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
						>
							<div className="w-10 h-10 flex items-center justify-center text-lg rounded-xl bg-gray-100 dark:bg-gray-700/50 shrink-0">
								{tx.emoji}
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">{tx.name}</p>
								<p className="text-xs text-gray-400 dark:text-gray-500">{tx.date}</p>
							</div>
							<div className="text-right shrink-0">
								<p
									className={`text-sm font-semibold ${
										tx.amount > 0 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
									}`}
								>
									{tx.amount > 0 ? '+' : '-'}
									{formatKRW(tx.amount)}원
								</p>
								<span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-full">
									{tx.category}
								</span>
							</div>
						</li>
					))}
				</ul>
			</div>

			{/* ── 금융 상품 추천 배너 ── */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
				{/* 적금 추천 */}
				<div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 p-4 text-white shadow-sm">
					<div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full" />
					<div className="relative z-10">
						<span className="text-xs font-semibold bg-white/20 px-2 py-0.5 rounded-full">추천 상품</span>
						<h3 className="mt-2 text-base font-bold">행복 정기적금</h3>
						<p className="text-xs text-white/80 mt-0.5">연 최대 4.5% · 1년 만기</p>
						<button className="mt-3 text-xs font-semibold bg-white text-emerald-600 px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors">
							지금 가입하기
						</button>
					</div>
				</div>

				{/* 대출 추천 */}
				<div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-violet-500 to-purple-700 p-4 text-white shadow-sm">
					<div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full" />
					<div className="relative z-10">
						<span className="text-xs font-semibold bg-white/20 px-2 py-0.5 rounded-full">한도 조회</span>
						<h3 className="mt-2 text-base font-bold">신용 대출 한도</h3>
						<p className="text-xs text-white/80 mt-0.5">최대 5천만원 · 금리 연 3.9%~</p>
						<button className="mt-3 text-xs font-semibold bg-white text-violet-600 px-3 py-1.5 rounded-lg hover:bg-violet-50 transition-colors">
							한도 조회
						</button>
					</div>
				</div>
			</div>

			{/* ── 하단 여백 ── */}
			<div className="h-4" />
		</div>
	);
}
