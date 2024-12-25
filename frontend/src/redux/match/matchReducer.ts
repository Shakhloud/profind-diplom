const initialState: any[] = []

const ADD_ITEMS_MATCH: string = "ADD_ITEMS_MATCH";
export const matchReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case ADD_ITEMS_MATCH:
            if (Array.isArray(action.payload)) {
                return [...action.payload];
            }
            return state;

        default:
            return state;
    }
}