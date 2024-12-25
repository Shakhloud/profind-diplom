type Profile = {
    username: string,
    role: null | "USER" | "ADMIN" | "MODER",
}

export type AuthState = {
    authData: {
        isAuth: boolean,
        isLoading: boolean,
        error: string | null,
    }
    profileData: {
        profile: Profile,
    }
}

const initialState: AuthState = {
    authData: {
        isLoading: false,
        isAuth: false,
        error: null,
    },
    profileData: {
        profile: {
            username: '',
            role: null,
        },
    }
}

const LOGIN_START: string = "LOGIN_START";
const LOGIN_SUCCESS: string = "LOGIN_SUCCESS";
const LOGIN_FAILURE: string = "LOGIN_FAILURE";
const LOGOUT: string = "LOGOUT";

export const loginReducer = (state: AuthState = initialState, action: any) => {
    switch (action.type) {

        case LOGIN_START:
            return {
                ...state,
                authData: {
                    ...state.authData,
                    isLoading: true,
                }
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                authData: {
                    isLoading: false,
                    isAuth: true,
                    error: null,
                },
                profileData: {
                    profile: {
                        username: action.profileData.username,
                        role: action.profileData.role,
                    }
                }
            }

        case LOGIN_FAILURE: {
            return {
                ...state,
                authData: {
                    ...state.authData,
                    isLoading: false,
                    error: action.error,
                }
            }
        }

        case LOGOUT: {
            return initialState;
        }

        default:
            return state;
    }
}