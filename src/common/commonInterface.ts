/** Member */
export interface AuthContextValue {
    isMember: boolean;
    login: () => void;
    logout: () => void;
}

export interface LoginResultMessage {
    callback_result: string;
    callback_new_member?: boolean;
}

export interface GetAuthPage {
    url: string;
}

export interface GetMemberAuth {
    isMember: boolean;
}

export interface CreateMemberAuth {
    isNewMember: boolean;
}

export interface CarouselItem {
    id: string | number;
    title: string;
    content?: string;
    price: number;
    discount?: number;
    image: string;
    features?: TagItem[];
}

export interface GetMainProduct {
    productCode: string;
    productName: string;
    price: number;
    discountRate: number;
    image: GetMainProductImage;
    features?: GetMainProductFeatures[];
    orderDeadlineDate?: string;
}

export interface GetMainProductImage {
    id: number;
    divCode: string;
    path: string;
    fullUrl: string;
}

export interface GetMainProductFeatures {
    code: string;
    desc: string;
}

export interface TagItem {
    id: string;
    color?: string;
    name: string;
}