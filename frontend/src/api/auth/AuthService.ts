import {serverAPI, URL_TOKEN_MODERATION_NEW, URL_TOKEN_PROFILE} from "../ServerAPI";
import jwt_decode from 'jwt-decode';
import {store} from "../../redux/store";
import * as auth from "../../redux/auth/authActions";
import {Profile} from "../../redux/auth/authActions";
import {formService} from "../form/FormService";
import {moderationService} from "../moderation/ModerationService";

export const BASE_TOKEN_KEY = 'base_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';

export class AuthService {
    constructor() {
        console.log('authService constructor');
    }

    public init(): void {
        let base_token_item = window.localStorage.getItem(BASE_TOKEN_KEY);
        let base_token: string;
        let isAuth: boolean = false;
        base_token_item === null ? base_token = '' : base_token = base_token_item;
        const state = store.getState();

        serverAPI.tokenCheck(base_token).then((result) => {
            if (result) {
                const tokenInfo: Profile = jwt_decode(base_token);
                store.dispatch(auth.loginSuccess({
                    profileData: {
                        username: tokenInfo.username,
                        role: tokenInfo.role,
                    }
                }))
                isAuth = true;
            }
        });

        setTimeout(() => {
            if (isAuth) {
                serverAPI.requestWrapper({
                    requestType: {
                        type: 'GET',
                    },
                    url: URL_TOKEN_PROFILE,
                    body: null,
                }).then(data => {
                    formService.updateData(data.data);
                    formService.updateMeta(data.status);
                }).catch(error => {
                    formService.updateMeta(error.status);
                })
            }
        }, 1);
    }

    public register(): void {
        const state: any = store.getState();
        const username: string = state.authReg.username;
        const password: string = state.authReg.password;
        serverAPI.regUser(username, password).then((result) => {
            if (result) {
                store.dispatch(auth.changeRegMessage('Регистрация прошла успешно.'))
            } else {
                store.dispatch(auth.changeRegMessage('Данный логин уже используется.'))
            }
        })
    }

    public login(username: string, password: string): void {
        serverAPI.loginUser(username, password).then((result) => {
            if (result === '403') {
                store.dispatch(auth.loginFailure('Логин/пароль введены неправильно.'))
            }
            if (typeof result !== "string") {
                this.saveTokens(result.base_token, result.refresh_token);
                const tokenInfo: Profile = jwt_decode(result.base_token);
                store.dispatch(auth.loginSuccess({
                    profileData: {
                        username: tokenInfo.username,
                        role: tokenInfo.role,
                    }
                }))
            }
        })
    }

    public logout(): void {
        this.saveTokens('', '');
        store.dispatch(auth.logout());
        window.location.href = '/';
    }

    public saveTokens(base_token: string, refresh_token: string): void {
        localStorage.setItem(BASE_TOKEN_KEY, base_token);
        localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
    }
}

export const authService: AuthService = new AuthService();