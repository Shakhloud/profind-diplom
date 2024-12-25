import {ProfileState} from "../profile/profileReducer";

export const addItemsFind = (items:ProfileState[]) => ({
    type: 'ADD_ITEMS_FIND',
    payload: items,
});