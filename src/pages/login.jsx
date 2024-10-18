import React from 'react';
//import PublicLayout from '@src/components/layout/PublicLayout.js';
import Login from '../components/auth/login';
import PublicLayout from '../components/layout/PublicLayout';
//import Login from '@src/components/auth/login/index.jsx';

const LoginPage = () => {
	return (
		<PublicLayout>
			<Login />
		</PublicLayout>
	);
};

export default LoginPage;
