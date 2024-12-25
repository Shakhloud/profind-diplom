import {ProfileState} from "../profile/profileReducer";

export const addItemsMatch = (items:ProfileState[]) => ({
    type: 'ADD_ITEMS_MATCH',
    payload: items,
});