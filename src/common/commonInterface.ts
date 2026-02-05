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