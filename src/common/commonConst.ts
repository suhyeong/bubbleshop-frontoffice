// 현재 지원하는 로그인 가능 플랫폼
export const AUTH_PROVIDER = {
    NAVER: 'naver',
    KAKAO: 'kakao'
};

export const LOADING_STATUS = {
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
}

export const DEFAULT_ERROR_MESSAGE = "서비스가 원활하지 않습니다. 잠시 후 다시 시도해주세요.";

export const MAIN_PRODUCT_TYPE = {
    NEW: 'N',
    RESERVE_CLOSE: 'C',
    STOCK_UP: 'S',
    POPULARITY: 'P'
}

// 슬라이드 컴포넌트 타입
export const CAROUSEL_COMPONENT_TYPE = {
    PRODUCT: 'product'
}

export const PRODUCT_TAG_ITEM_COLOR = [
    {
        id: 'N',
        color: 'orange'
    },
    {
        id: 'R',
        color: 'red'
    },
]