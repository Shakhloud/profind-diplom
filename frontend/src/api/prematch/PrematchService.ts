import {store} from "../../redux/store";
import * as prematch from "../../redux/prematch/prematchActions";

export class PrematchService {
    constructor() {
        console.log('prematchService constructor');
    }

    public updateList(usersList: any[]) {
        store.dispatch(prematch.addItemsPrematch(usersList));
    }


}

export const prematchService: PrematchService = new PrematchService();