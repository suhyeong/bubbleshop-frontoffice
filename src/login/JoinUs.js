import {Button, Flex} from "antd";
import "./JoinUs.css";
import naverLogo from '../asserts/image/naver_login_logo.png';
import {NaverLogin} from "./NaverLogin";
import {useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {LOADING_STATUS} from "../common/CommonConst";

function JoinUs() {
    const navigate = useNavigate();
    const naver = NaverLogin();

    const onClickNaverJoin = () => {
        // 네이버 회원가입 진행
        naver.login(true).then((url) => {
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
                navigate('/', {replace: true});
            }
        }

        window.addEventListener('message', listener, false);

        return () => {
            window.removeEventListener('message', listener);
        }
    }, [navigate]);

    return (
        <Flex className="join-btn-flex" gap="small" align="center" justify="center" vertical>
            <Button className="join-btn" onClick={onClickNaverJoin}
                    icon={<img className={"join-btn-logo"} src={naverLogo} alt="네이버"/>}
                >
                네이버로 시작하기
            </Button>
            <Button className="join-btn" onClick={onClickKakaoJoin}
                    icon={<img className={"join-btn-logo"} src={naverLogo} alt="카카오"/>}>
                카카오로 시작하기
            </Button>
        </Flex>
    );
}

export default JoinUs;