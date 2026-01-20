import {AUTH_PROVIDER, DEFAULT_ERROR_MESSAGE} from "../common/CommonConst";
import {getErrorMessage} from "../AxiosResponse";
import api from "../common/CommonApi";
import {errorModalWithActionClick} from "../common/CommonComponent";

export function NaverLogin() {
    const login = async () => {
        return await api.post(`/member-proxy/member/v1/auth/${AUTH_PROVIDER.NAVER}/page`)
            .then(response => {
                return response.data.url;
            })
            .catch(error => {
                const message = getErrorMessage(error.response, DEFAULT_ERROR_MESSAGE);
                errorModalWithActionClick(message, () => {});
            });
    }

    return {
        login
    };
}
