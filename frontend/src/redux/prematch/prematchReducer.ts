const initialState: any[] = []

const ADD_ITEMS_PREMATCH: string = "ADD_ITEMS_PREMATCH";
export const prematchReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case ADD_ITEMS_PREMATCH:
            if (Array.isArray(action.payload)) {
                return [...action.payload];
            }
            return state;

        default:
            return state;
    }
}