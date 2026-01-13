import "./Main.css";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import OAuthCallback from "./login/OAuthCallback";
import Login from "./login/Login";
import { notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

function Main() {
    const location = useLocation();
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        if (location && location.state && location.state.newMember) {
            // TODO 디자인 변경
            api.open({
                title: '회원가입을 환영합니다!',
                description:
                    '회원가입해주셔서 감사합니다앙',
                icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                showProgress: true
            });
            // 신규 로그인(회원가입) 한 회원일 경우 새로고침시 state 값이 남아있어 정상 처리 후 replace 처리
            navigate(location.pathname, { replace: true });
        }
    }, [location, api, navigate]);

    return (
        <div className='main-div'>
            {contextHolder}
            <MainHeader />
            <div className='main-content'>
                <Routes>
                    <Route path='/' />
                    <Route path='/login' element={<Login />} />
                    <Route path='/oauth-callback' element={<OAuthCallback />} />
                </Routes>
            </div>
            <MainFooter />
        </div>
    );
}

export default Main;