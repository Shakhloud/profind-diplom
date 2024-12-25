import {store} from "../../redux/store";
import * as match from "../../redux/match/matchActions";

export class MatchService {
    constructor() {
        console.log('matchService constructor');
    }

    public updateList(usersList: any[]) {
        store.dispatch(match.addItemsMatch(usersList));
    }


}

export const matchService = new MatchService();