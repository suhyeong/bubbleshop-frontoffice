import {useEffect, useState} from "react";
import {LOADING_STATUS, AUTH_PROVIDER, AUTH_ERROR} from "../common/CommonConst";
import {Flex, Spin} from "antd";
import {
    LoadingOutlined,
} from '@ant-design/icons';

function OAuthCallback() {
    const [provider, setProvider] = useState('');
    const [status, setStatus] = useState(LOADING_STATUS.LOADING);

    useEffect(() => {
        const provider = new URLSearchParams(window.location.search).get('provider');
        setProvider(provider);

        const isError = new URLSearchParams(window.location.search).get('error');

        const hash = window.location.hash.substr(1);
        const params = new URLSearchParams(hash);

        console.log('isError:'+isError+'params:'+params);

        if (provider === AUTH_PROVIDER.NAVER) {
            // login failed
            if (isError && AUTH_ERROR.ERROR.includes(isError)) {
                console.log('error !!');
                cancelNaverLogin();
            } else {
                // success
                callbackNaverLogin();
            }
        }
    }, []);

    const callbackNaverLogin = () => {

    }

    const cancelNaverLogin = () => {
        window.close();
    }

    // 팝업 창인 경우 부모 창에 메시지 전송 후 닫기
    useEffect(() => {
        if (window.opener && status === 'success') {
            if (status === LOADING_STATUS.SUCCESS) {
                // todo success
                window.opener.postMessage(
                    { type: 'OAUTH_SUCCESS', provider },
                    window.location.origin
                );
            } else if(status === LOADING_STATUS.ERROR) {
                // todo error
            }

            window.opener.postMessage(
                { type: 'OAUTH_SUCCESS', provider },
                window.location.origin
            );
        }
    }, [status, provider]);

    return (
        <Flex align={"center"} gap={"middle"}>
            <Spin indicator={<LoadingOutlined spin />} />
        </Flex>
    );
}

export default OAuthCallback;