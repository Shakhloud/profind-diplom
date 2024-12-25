const initialState: any[] = []

const ADD_ITEMS_FIND: string = "ADD_ITEMS_FIND";
export const findReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case ADD_ITEMS_FIND:
            if (Array.isArray(action.payload)) {
                return [...action.payload];
            }
            return state;

        default:
            return state;
    }
}