import {AUTH_PROVIDER, DEFAULT_ERROR_MESSAGE} from "../common/commonConst";
import {getErrorMessage} from "../common/axiosResponse";
import api from "../common/commonApi";
import {errorModalWithActionClick} from "../common/commonComponent";
import {AxiosError, AxiosResponse} from "axios";
import {GetAuthPage} from "../common/commonInterface";

export function NaverLogin() {
    const login = async () => {
        return await api.post(`/member-proxy/member/v1/auth/${AUTH_PROVIDER.NAVER}/page`)
            .then((response: AxiosResponse<GetAuthPage>) => {
                return response.data.url;
            })
            .catch((error: AxiosError) => {
                const message = getErrorMessage(DEFAULT_ERROR_MESSAGE, error.response);
                errorModalWithActionClick(message, () => {});
            });
    }

    return {
        login
    };
}
