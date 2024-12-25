import {store} from "../../redux/store";
import * as moderation from "../../redux/moderation/moderationActions";
import {serverAPI, URL_TOKEN_MODERATION_NEW} from "../ServerAPI";

export class ModerationService {
    constructor() {
        console.log('moderationService constructor');
    }

    public updateList(usersList: any[]) {
        store.dispatch(moderation.addItemsModer(usersList));
    }


}

export const moderationService: ModerationService = new ModerationService();