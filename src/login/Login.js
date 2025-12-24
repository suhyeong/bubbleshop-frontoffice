import {Button, Flex} from "antd";
import "./LoginUs.css";
import naverLogo from "../asserts/image/naver_login_logo.png";
import {NaverLogin} from "./NaverLogin";
import {useEffect} from "react";
import {LOADING_STATUS} from "../common/CommonConst";
import {useNavigate} from "react-router-dom";


function Login() {
    const navigate = useNavigate();
    const naver = NaverLogin();

    const onClickNaverLogin = () => {
        // 네이버 회원가입 진행
        naver.login(false).then((url) => {
            if (url) {
                window.open(url, '네이버 로그인');
            }
        });
    }

    const onClickKakaoLogin = () => {
        // 카카오 로그인 진행
        // TODO
    }

    useEffect(() => {
        const listener = (result) => {
            if(result.data.callback_result === LOADING_STATUS.SUCCESS) {
                navigate('/', {replace: true});
            }
        }

        window.addEventListener('message', listener, false);

        return () => {
            window.removeEventListener('message', listener);
        }
    }, [navigate]);

    return (
        <Flex className="login-btn-flex" gap="small" align="center" justify="center" vertical>
            <Button className="login-btn" onClick={onClickNaverLogin}
                    icon={<img className={"login-btn-logo"} src={naverLogo} alt="네이버"/>}>
                네이버로 로그인
            </Button>
            <Button className="login-btn" onClick={onClickKakaoLogin}
                    icon={<img className={"login-btn-logo"} src={naverLogo} alt="카카오"/>}>
                카카오로 로그인
            </Button>
        </Flex>
    );
}

export default Login;