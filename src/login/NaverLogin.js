
export function NaverLogin() {
    const callbackUrl = process.env.REACT_APP_NAVER_CALLBACK_URL;

    const login = (isJoin) => {
        // 네이버 로그인 설정
        const REDIRECT_URI = encodeURIComponent(callbackUrl); // 실제 Callback URL
        const statePrefix = isJoin ? 'join_' : 'login_';
        const STATE = statePrefix + Math.random().toString(36).substr(2, 11); // 랜덤 state 생성

        // 네이버 로그인 URL 생성
        return `https://nid.naver.com/oauth2.0/authorize?response_type=token&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}`;
    }

    return {
        login
    };
}
