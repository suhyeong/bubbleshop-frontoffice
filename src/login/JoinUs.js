import {Button, Flex} from "antd";
import "./JoinUs.css";
import naverLogo from '../asserts/image/naver_login_logo.png';
import {NaverLogin} from "./NaverLogin";

function JoinUs() {
    const naver = NaverLogin();

    const onClickNaverJoin = () => {
        // 네이버 회원가입 진행
        const url = naver.login(true);
        window.open(url, 'naverLogin');
    }

    const onClickKakaoJoin = () => {
        // 카카오 회원가입 진행
        // TODO
    }

    return (
        <Flex className="join-btn-flex" gap="small" align="center" justify="center" vertical>
            <div>
                {/*Join Us*/}
            </div>
            <Button className="join-btn" onClick={onClickNaverJoin}
                    icon={<img className={"join-btn-logo"} src={naverLogo} alt="네이버"/>}>
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