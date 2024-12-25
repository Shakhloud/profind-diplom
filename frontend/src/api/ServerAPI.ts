import axios from "axios";
import {Profile} from "../redux/profile/profileReducer";
import {bool} from "yup";
import {loginSuccess} from "../redux/auth/authActions";
import {authService, REFRESH_TOKEN_KEY} from "./auth/AuthService";
import {rejects} from "assert";


const URL_AUTH_HOST = `http://localhost:8080`
export const URL_CORE_HOST = `http://localhost:8081`

const URL_TOKEN_CHECK = `${URL_AUTH_HOST}/check`;
const URL_TOKEN_REG = `${URL_AUTH_HOST}/register`;
const URL_TOKEN_LOG = `${URL_AUTH_HOST}/login`;
const URL_TOKEN_REFRESH = `${URL_AUTH_HOST}/refresh`;

export const URL_TOKEN_PROFILE = `${URL_CORE_HOST}/profile`;

export const URL_TOKEN_MODERATION_NEW = `${URL_CORE_HOST}/profiles?filterStatus=NEW`;

export const URL_TOKEN_MODERATION_PUT = `${URL_CORE_HOST}/profile?targetUsername=`;

const reqToCoreInstance = axios.create();

type Tokens = {
    base_token: string,
    refresh_token: string,
}

type RequestType = {
    type: 'PUT' | 'POST' | 'GET' | 'DELETE',
}

type RequestWrapper = {
    requestType: RequestType,
    url: string,
    body: any
}

class ServerAPI {
    constructor() {
        console.log('ServerAPI constructor');
    }

    public tokenCheck(base_token: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            axios.post(URL_TOKEN_CHECK, {
                base_token: base_token,
            }).then((data) => {
                resolve(true);
            }).catch((data) => {
                resolve(false);
            });
        })
    }

    public regUser(username: string, password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            axios.post(URL_TOKEN_REG, {
                username: username,
                password: password,
            }).then((data) => {
                resolve(true);
            }).catch((data) => {
                resolve(false);
            });
        });
    }

    public loginUser(username: string, password: string): Promise<Tokens | string> {
        return new Promise((resolve, reject) => {
            axios.post(URL_TOKEN_LOG, {
                username: username,
                password: password,
            }).then((data) => {
                resolve({
                    base_token: data.data.base_token,
                    refresh_token: data.data.refresh_token,
                });
            }).catch(error => {
                resolve(`${error.response.status}`);
            });
        });
    }

    public refresh(refresh_token: string): Promise<Tokens> {
        return new Promise((resolve, reject) => {
            axios.post(URL_TOKEN_REFRESH, {
                refresh_token: refresh_token,
            }).then((data) => {
                resolve({
                    base_token: data.data.base_token,
                    refresh_token: data.data.refresh_token,
                });
            }).catch(error => {
                reject();
            });
        });
    }

    public requestErrorHandler(error: number, request: RequestWrapper, resolve: any, reject: any): void {
        if (error === 403) {
            let refresh_token_item = window.localStorage.getItem(REFRESH_TOKEN_KEY);
            let refresh_token: string;
            refresh_token_item === null ? refresh_token = '' : refresh_token = refresh_token_item;
            this.refresh(refresh_token).then(data => {
                authService.saveTokens(data.base_token, data.refresh_token);
                this.requestWrapper(request).then((data) => {
                    resolve(data);
                }).catch((error) => {
                    reject(error.response.status);
                });
            }).catch(() => {
                authService.logout();
            });
        }
    }

    public requestWrapper(request: RequestWrapper): Promise<any> {
        switch (request.requestType.type) {
            case 'POST':
                return new Promise((resolve, reject) => {
                    reqToCoreInstance.post(request.url, request.body, {
                        headers: {
                            auth_token: `bearer_${localStorage.getItem("base_token")}`,
                        }
                    }).then((data) => {
                        resolve(data);
                    }).catch(error => {
                        setTimeout(() => {
                            this.requestErrorHandler(error.response.status, request, resolve, reject)
                        }, 500);
                    })
                })
            case 'GET':
                return new Promise((resolve, reject) => {
                    reqToCoreInstance.get(request.url, {
                        headers: {
                            auth_token: `bearer_${localStorage.getItem("base_token")}`,
                        }
                    }).then((data) => {
                        resolve(data);
                    }).catch(error => {
                        this.requestErrorHandler(error.response.status, request, resolve, reject);
                    })
                })
            case 'PUT':
                return new Promise((resolve, reject) => {
                    reqToCoreInstance.put(request.url, request.body, {
                        headers: {
                            auth_token: `bearer_${localStorage.getItem("base_token")}`,
                        }
                    }).then((data) => {
                        resolve(data);
                    }).catch(error => {
                        this.requestErrorHandler(error.response.status, request, resolve, reject);
                    })
                })
            case 'DELETE':
                return new Promise((resolve, reject) => {
                    reqToCoreInstance.delete(request.url, {
                        headers: {
                            auth_token: `bearer_${localStorage.getItem("base_token")}`,
                        }
                    }).then((data) => {
                        resolve(data);
                    }).catch(error => {
                        this.requestErrorHandler(error.response.status, request, resolve, reject);
                    })
                })
        }
    }


    public start() {
    }
}

export const serverAPI: ServerAPI = new ServerAPI();