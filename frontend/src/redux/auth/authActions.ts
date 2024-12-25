export type Profile = {
    username: string,
    role: "USER" | "ADMIN" | "MODER" | null,
}
export type LoginSuccessData = {
    profileData: Profile,
}

export type LogRegData = {
    username: string,
    password: string,
}

//Login
export const loginStart = () => {
    return {
        type: 'LOGIN_START',
    }
}

export const loginSuccess = (actionData: LoginSuccessData) => {

    return {
        type: 'LOGIN_SUCCESS',
        profileData: {
            username: actionData.profileData.username,
            role: actionData.profileData.role,
        },
    };
};

export const loginFailure = (error: string) => {
    return {
        type: 'LOGIN_FAILURE',
        error: error,
    };
};

export const logout = () => {
    return {
        type: 'LOGOUT',
    };
};

//Registration
export const registration = (regData: LogRegData) => {
    return {
        type: 'REG_TRY',
        username: regData.username,
        password: regData.password,
    };
};

export const changeRegMessage = (message: string) => {
    return {
        type: 'CHANGE_MESSAGE',
        message: message,
    };
};



