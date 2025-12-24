import {useCallback, useEffect, useState} from "react";
import {AUTH_PROVIDER, DEFAULT_ERROR_MESSAGE, LOADING_STATUS} from "../common/CommonConst";
import {Flex, Spin} from "antd";
import {LoadingOutlined} from '@ant-design/icons';
import api from "../common/CommonApi";
import "../common/CommonCss.css";
import {getErrorMessage} from "../AxiosResponse";
import {errorModalWithActionClick} from "../common/CommonComponent";

function OAuthCallback() {
    const [provider, setProvider] = useState('');
    const [status, setStatus] = useState(LOADING_STATUS.LOADING);

    const callbackNaverLogin = useCallback((params, provider) => {
        const error = params.get('error');
        // 로그인 실패
        if (error) {
            setStatus(LOADING_STATUS.ERROR);
            errorModalWithActionClick(params.get('error_description') ?? DEFAULT_ERROR_MESSAGE, onClickAlert)
            return;
        }

        // 로그인 성공
        const request = {
            state: params.get('state'),
            code: params.get('code'),
            provider: provider
        }

        api.post(`/member-proxy/member/v1/auth`, request)
            .then(response => {
                setStatus(LOADING_STATUS.SUCCESS);
            })
            .catch(error => {
                setStatus(LOADING_STATUS.ERROR);
                const message = getErrorMessage(error.response, DEFAULT_ERROR_MESSAGE);
                errorModalWithActionClick(message, onClickAlert)
            });
    }, []);

    useEffect(() => {
        // ex) oauth-callback?provider=naver&code=gTij0X1FIfw3G2BAoz&state=J277kd6d0d38g80urmha8f2t0ktb
        const params = new URLSearchParams(window.location.search);
        const provider = params.get('provider');
        setProvider(provider);

        if (provider === AUTH_PROVIDER.NAVER) {
            callbackNaverLogin(params, provider);
        }
    }, [callbackNaverLogin]);

    // 팝업 창인 경우 부모 창에 메시지 전송 후 닫기
    useEffect(() => {
        if (window.opener && status === LOADING_STATUS.SUCCESS) {
            window.opener.postMessage({ callback_result: LOADING_STATUS.SUCCESS }, '*');
            window.close();
        }
    }, [status, provider]);

    const onClickAlert = () => {
        window.opener.postMessage({ callback_result: LOADING_STATUS.ERROR }, '*');
        window.close();
    }

    return (
        <Flex className={"full-width"} gap="middle" align={"center"} justify={"center"}>
            {
                status === LOADING_STATUS.LOADING && <Spin size={"large"} indicator={<LoadingOutlined className={"loading-spin"} spin />} />
            }
        </Flex>
    );
}

export default OAuthCallback;