const initialState: any[] = []

const ADD_ITEMS_MODER: string = "ADD_ITEMS_MODER";
export const moderationReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case ADD_ITEMS_MODER:
            if (Array.isArray(action.payload)) {
                return [...action.payload];
            }
            return state;

        default:
            return state;
    }
}