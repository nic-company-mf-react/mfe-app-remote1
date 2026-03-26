import {
	Home,
	Landmark,
	CreditCard,
	PiggyBank,
	ArrowLeftRight,
	BarChart3,
	HeadphonesIcon,
	Settings,
} from 'lucide-react';

export type NavSubItem = {
	name: string;
	path: string;
	pro?: boolean;
	new?: boolean;
};

export type NavItem = {
	name: string;
	icon: React.ReactNode;
	path?: string;
	subItems?: NavSubItem[];
};

export const navItems: NavItem[] = [
	{
		icon: <Home />,
		name: '홈',
		subItems: [{ name: '개인뱅킹 홈', path: '/main' }],
	},
	{
		icon: <Landmark />,
		name: '계좌',
		subItems: [
			{ name: '계좌 조회', path: '/example/account-page' },
			{ name: '입출금 내역', path: '/main' },
			{ name: '자동이체 관리', path: '/main' },
		],
	},
	{
		icon: <ArrowLeftRight />,
		name: '이체',
		subItems: [
			{ name: '계좌 이체', path: '/main' },
			{ name: '해외 송금', path: '/main' },
			{ name: '이체 예약', path: '/main' },
		],
	},
	{
		icon: <PiggyBank />,
		name: '저축/적금',
		subItems: [
			{ name: '상품 가입', path: '/main' },
			{ name: '보유 상품 조회', path: '/main' },
		],
	},
	{
		icon: <CreditCard />,
		name: '대출',
		subItems: [
			{ name: '한도 조회', path: '/main' },
			{ name: '대출 신청', path: '/main' },
			{ name: '상환 관리', path: '/main' },
		],
	},
	{
		icon: <BarChart3 />,
		name: '자산 관리',
		subItems: [
			{ name: '자산 현황', path: '/main' },
			{ name: '소비 분석', path: '/main' },
		],
	},
];

export const othersItems: NavItem[] = [
	{
		icon: <HeadphonesIcon />,
		name: '고객센터',
		subItems: [
			{ name: '자주 묻는 질문', path: '/main' },
			{ name: '1:1 문의', path: '/main' },
		],
	},
	{
		icon: <Settings />,
		name: '설정',
		subItems: [{ name: '보안 설정', path: '/main' }],
	},
];
