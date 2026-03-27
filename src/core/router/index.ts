import { createAppRouter } from './app-common-router.ts';
import routes from '@/shared/router';
import { registerWindowRouter } from '@nic/mfe-lib-shared/utils';

const router = createAppRouter(routes, {
	// .env 파일에 설정된 VITE_ROUTER_BASENAME 값을 사용합니다.
	basename: import.meta.env.VITE_ROUTER_BASENAME,
});

// standalone 실행 시에만 등록 (host에 임베드 시 host의 $router를 그대로 사용)
if (typeof window !== 'undefined' && !window.$router) {
	registerWindowRouter(router);
}

export * from './app-common-router.ts';
export default router;
