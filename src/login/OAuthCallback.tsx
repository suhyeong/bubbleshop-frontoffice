import {useCallback, useEffect, useState} from "react";
import {AUTH_PROVIDER, DEFAULT_ERROR_MESSAGE, LOADING_STATUS} from "../common/commonConst";
import {Flex, Spin} from "antd";
import {LoadingOutlined} from '@ant-design/icons';
import api from "../common/commonApi";
import "../common/commonCss.css";
import {getErrorMessage} from "../common/axiosResponse";
import {errorModalWithActionClick} from "../common/commonComponent";
import {AxiosError, AxiosResponse} from "axios";
import {CreateMemberAuth} from "../common/commonInterface";

function OAuthCallback() {
    const [provider, setProvider] = useState<string>('');
    const [status, setStatus] = useState<string>(LOADING_STATUS.LOADING);
    const [isNewMember, setIsNewMember] = useState<boolean>(false);

    const callbackNaverLogin = useCallback((params: URLSearchParams, provider: string) => {
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
            .then((response: AxiosResponse<CreateMemberAuth>) => {
                setIsNewMember(response.data.isNewMember);
                setStatus(LOADING_STATUS.SUCCESS);
            })
            .catch((error: AxiosError) => {
                setStatus(LOADING_STATUS.ERROR);
                const message = getErrorMessage(DEFAULT_ERROR_MESSAGE, error.response);
                errorModalWithActionClick(message, onClickAlert)
            });
    }, []);

    useEffect(() => {
        // ex) oauth-callback?provider=naver&code=gTij0X1FIfw3G2BAoz&state=J277kd6d0d38g80urmha8f2t0ktb
        const params = new URLSearchParams(window.location.search);
        const provider = params.get('provider');
        setProvider(provider ?? '');

        if (provider === AUTH_PROVIDER.NAVER) {
            callbackNaverLogin(params, provider);
        }
    }, [callbackNaverLogin]);

    // 팝업 창인 경우 부모 창에 메시지 전송 후 닫기
    useEffect(() => {
        if (window.opener && status === LOADING_STATUS.SUCCESS) {
            window.opener.postMessage({ callback_result: LOADING_STATUS.SUCCESS, callback_new_member: isNewMember }, '*');
            window.close();
        }
    }, [status, provider, isNewMember]);

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