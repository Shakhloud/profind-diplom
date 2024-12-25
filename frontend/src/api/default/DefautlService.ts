import {serverAPI, URL_CORE_HOST, URL_TOKEN_MODERATION_NEW, URL_TOKEN_PROFILE} from "../ServerAPI";
import {moderationService} from "../moderation/ModerationService";
import {formService} from "../form/FormService";
import {findService} from "../find/FindService";
import {store} from "../../redux/store";
import {prematchService} from "../prematch/PrematchService";
import {matchService} from "../match/MatchService";

export class DefaultService {
    constructor() {
        console.log('defaultService constructor');
    }

    public profileInit() {
        serverAPI.requestWrapper({
            requestType: {
                type: 'GET',
            },
            url: URL_TOKEN_PROFILE,
            body: null,
        }).then(data => {
            if (data.status === 200) {
                formService.updateData(data.data);
                formService.updateMeta(data.status);
            }
            if (data.status === 204) {
                formService.updateMeta(data.status);
            }
        }).catch(error => {
            console.log(error);
        })
    }

    public moderationInit() {
        const storeState = store.getState();
        if (storeState.authLog.profileData.profile.role === 'MODER') {
            setTimeout(() => {
                serverAPI.requestWrapper({
                    requestType: {
                        type: 'GET',
                    },
                    url: URL_TOKEN_MODERATION_NEW,
                    body: null,
                }).then(data => {
                    if (data.status === 200) {
                        moderationService.updateList(data.data);
                    }
                }).catch(error => {
                    console.log(error);
                });
                console.log('initModeration');
            }, 50);
        }
    }

    public findInit() {
        setTimeout(() => {
            let userData, storeState, filterGoal;
            storeState = store.getState();
            userData = storeState.profile.profile;
            if (userData.status == 'VALID') {
                switch (userData.goal) {
                    case 'STUDENT':
                        filterGoal = 'TEACHER';
                        break;
                    case 'TEACHER':
                        filterGoal = 'STUDENT';
                        break;
                    case 'STARTUP_PLAYER':
                        filterGoal = 'STARTUP_PLAYER';
                        break;
                    case 'STARTUP_BOSS':
                        filterGoal = 'INVESTOR';
                        break;
                    case 'INVESTOR':
                        filterGoal = 'STARTUP_BOSS';
                        break;
                    default:
                        filterGoal = userData.goal;
                }
                serverAPI.requestWrapper({
                    requestType: {
                        type: 'GET',
                    },
                    url: (filterGoal === 'INVESTOR') ? `${URL_CORE_HOST}/profiles/find?goal=${filterGoal}` : `${URL_CORE_HOST}/profiles/find?goal=${filterGoal}&lang=${userData.program_language}`,
                    body: null,
                }).then(data => {
                    if (data.status === 200) {
                        findService.updateList(data.data);
                    }
                }).catch(error => {
                    console.log(error);
                })
            }
        }, 50);
    }

    public prematchInit() {
        setTimeout(() => {
            {
                serverAPI.requestWrapper({
                    requestType: {
                        type: 'GET',
                    },
                    url: `${URL_CORE_HOST}/profiles/prematch`,
                    body: null,
                }).then(data => {
                    if (data.status === 200) {
                        prematchService.updateList(data.data);
                    }
                }).catch(error => {
                    console.log(error);
                })
            }
        }, 50);
    }

    public matchInit() {
        setTimeout(() => {
                serverAPI.requestWrapper({
                    requestType: {
                        type: 'GET',
                    },
                    url: `${URL_CORE_HOST}/profiles/match`,
                    body: null,
                }).then(data => {
                    console.log(data);
                    if (data.status === 200) {
                        console.log(data);
                        matchService.updateList(data.data);
                    }
                }).catch(error => {
                    console.log(error);
                })
        }, 50);
    }

    public init() {
        let userData, storeState, filterGoal;

        //Инициализация профиля
        this.profileInit();
        //Инициализация анкет модерации
        this.moderationInit();
        //Инициализация списка поиска
        this.findInit();
        //Инициализация списка прематчей
        this.prematchInit();
        //Инициализация метчей
        this.matchInit();
    }
}


export const
    defaultService = new DefaultService();