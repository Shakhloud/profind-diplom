import {ProfileState} from "../profile/profileReducer";

export const addItemsPrematch = (items:ProfileState[]) => ({
    type: 'ADD_ITEMS_PREMATCH',
    payload: items,
});