const defaultState: any = {
    username: '',
    password: '',
    message: '',
}

const REG_TRY: string = "REG_TRY";
const CHANGE_MESSAGE: string = "CHANGE_MESSAGE";


export const registerReducer = (state: object = defaultState, action: any) => {
    switch (action.type) {
        case REG_TRY:
            return {
                ...state,
                username: action.username,
                password: action.password,
            }

        case CHANGE_MESSAGE:
            return {
                ...state,
                message: action.message,
            }

        default:
            return state;
    }
}