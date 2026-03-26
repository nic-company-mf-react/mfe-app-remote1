import './assets/styles/app.css';
import { useRoutes } from 'react-router';
// 통합 라우터 는 레이아웃이 있기때문에 사용하지 않습니다.
//import routes from '@/shared/router';
import MainRoutes from '@/domains/main/router';

//const Remote1App = () => {
//	// useRoutes는 라우트 배열을 "URL → 컴포넌트" 변환 테이블로 보고, 현재 URL에 해당하는 컴포넌트를 돌려주는 역할
//	const element = useRoutes(routes);
//	return <>{element}</>;
//};

const Remote1App = () => {
	const element = useRoutes([
		...MainRoutes,
		//{ path: 'account', children: AccountRouter },
	]);
	return <>{element}</>;
};

export default Remote1App;
