import type { TAppRoute } from '@nic/mfe-lib-shared/types';
import loadable from '@loadable/component';

// 라우터에 연결할 페이지를 import 한다.
// loadable 라이브러리는 react에서 Code Spliting를 제공해주는 라이브러리 이다.
const AccountIndex = loadable(() => import('@/domains/example/pages/AccountIndex'));
const UseApiExample = loadable(() => import('@/domains/example/pages/UseApiExample'));

const routes: TAppRoute[] = [
	{
		path: 'account-page',
		element: <AccountIndex />,
		name: '계좌 메인',
	},
	{
		path: 'use-api-example',
		element: <UseApiExample />,
		name: 'useApi 예제',
	},
];

export default routes;
