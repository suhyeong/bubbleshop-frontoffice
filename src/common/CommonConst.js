// 현재 지원하는 회원가입/로그인 가능 플랫폼
export const AUTH_PROVIDER = {
    NAVER: 'naver',
    KAKAO: 'kakao'
};

export const LOADING_STATUS = {
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
}

export const ACCESS_TYPE = {
    LOGIN: {
        code: 'L',
        prefix: 'login_'
    },
    JOIN: {
        code: 'J',
        prefix: 'join_'
    }
}

export const AUTH_ERROR = {
    ERROR: ['access_denied']
}