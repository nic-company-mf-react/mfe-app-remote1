import { createAppRouter } from './app-common-router.ts';
import routes from '@/shared/router';
import { registerWindowRouter } from '@axiom/mfe-lib-shared/utils';

const router = createAppRouter(routes, {
	// .env 파일에 설정된 VITE_ROUTER_BASENAME 값을 사용합니다.
	basename: import.meta.env.VITE_ROUTER_BASENAME,
});

// standalone 실행 시에만 등록
if (typeof window !== 'undefined' && !window.$router) {
	registerWindowRouter(router);
}

export * from './app-common-router.ts';
export default router;
