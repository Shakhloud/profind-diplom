import {ProfileState} from "../profile/profileReducer";

export const addItemsModer = (items:ProfileState[]) => ({
    type: 'ADD_ITEMS_MODER',
    payload: items,
});