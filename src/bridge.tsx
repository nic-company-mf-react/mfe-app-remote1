import './assets/styles/app.css';
import { useRoutes } from 'react-router';
import routes from '@/shared/router'; // 통합 라우터 참조

const Remote1App = () => {
	// useRoutes는 라우트 배열을 "URL → 컴포넌트" 변환 테이블로 보고, 현재 URL에 해당하는 컴포넌트를 돌려주는 역할
	const element = useRoutes(routes);
	return <>{element}</>;
};

export default Remote1App;
