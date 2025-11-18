import {ACCESS_TYPE, AUTH_PROVIDER} from "../common/CommonConst";
import {getResult} from "../AxiosResponse";
import api from "../common/CommonApi";

export function NaverLogin() {
    const login = async (isJoin) => {
        return await api.post(`/member-proxy/member/v1/auth/${AUTH_PROVIDER.NAVER}/page?accessType=${ACCESS_TYPE.JOIN.code}`)
            .then(response => {
                console.log('response.data.url');
                console.log(response.data.url);
                return response.data.url;
            })
            .catch(error => {
                //console.error("로그인 시도시 에러가 발생했습니다. Error : ", error);
                getResult(error.response, "서비스가 원활하지 않습니다. 잠시 후 다시 시도해주세요.");
            });
        //
        // // 네이버 로그인 설정
        // const REDIRECT_URI = encodeURIComponent(callbackUrl); // 실제 Callback URL
        // const statePrefix = isJoin ? ACCESS_TYPE.JOIN : ACCESS_TYPE.LOGIN;
        // const STATE = statePrefix + Math.random().toString(36).substr(2, 11); // 랜덤 state 생성
        //
        // //https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_url}}&response_type=code&auth_tran_id=${}&is_popup=false
        //
        // // 네이버 로그인 URL 생성
        // return `${authorizeUrl}?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}`;
    }

    return {
        login
    };
}
