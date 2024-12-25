import {store} from "../../redux/store";
import * as profile from "../../redux/profile/profileActions";

export class FormService {
    constructor() {
        console.log('formService constructor');
    }

    public updateData(userData: any) {
        store.dispatch(profile.profileUpdate(userData));
    }

    public updateMeta(meta: number) {
        store.dispatch(profile.metaUpdate(meta));
    }

}

export const formService: FormService = new FormService();