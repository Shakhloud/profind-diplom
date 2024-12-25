import {createStore, combineReducers} from "redux";
import {loginReducer} from "./auth/loginReducer";
import {registerReducer} from "./auth/registerReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {profileReducer} from "./profile/profileReducer";
import {moderationReducer} from "./moderation/moderationReducer";
import {findReducer} from "./find/findReducer";
import {prematchReducer} from "./prematch/prematchReducer";
import {matchReducer} from "./match/matchReducer";

const rootReducer = combineReducers({
    authLog: loginReducer,
    authReg: registerReducer,
    profile: profileReducer,
    prematch: prematchReducer,
    match: matchReducer,
    moderation: moderationReducer,
    find: findReducer,
})
export const store = createStore(rootReducer, composeWithDevTools());