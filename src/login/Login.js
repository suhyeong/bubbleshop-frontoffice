import {Button, Flex} from "antd";
import "./Login.css";
import {NaverLogin} from "./NaverLogin";
import {useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {LOADING_STATUS} from "../common/CommonConst";
import {useAuth} from "../AuthProvider";

function Login() {
    const navigate = useNavigate();
    const naver = NaverLogin();
    const { login } = useAuth();

    const onClickNaverJoin = () => {
        // 네이버 회원가입 진행
        naver.login().then((url) => {
            if (url) {
                window.open(url, '네이버 회원가입');
            }
        });
    }

    const onClickKakaoJoin = () => {
        // 카카오 회원가입 진행
        // TODO
    }

    useEffect(() => {
        function listener(result) {
            if(result.data.callback_result === LOADING_STATUS.SUCCESS) {
                login();
                navigate('/', { replace: true, state: { newMember: result.data.callback_new_member } });
            }
        }

        window.addEventListener('message', listener, false);

        return () => {
            window.removeEventListener('message', listener);
        }
    }, [navigate, login]);

    return (
        <Flex className="join-btn-flex" gap="middle" align="center" justify="center" vertical>
            <Button className="naver-login-btn" onClick={onClickNaverJoin}>네이버로 시작하기</Button>
            <Button className="kakao-login-btn" onClick={onClickKakaoJoin}>카카오로 시작하기</Button>
        </Flex>
    );
}

export default Login;