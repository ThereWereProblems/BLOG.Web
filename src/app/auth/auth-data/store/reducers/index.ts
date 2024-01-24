import { createReducer, on } from "@ngrx/store";
import { LoginResult } from "src/app/shered/auth/login-result.model";
import { AuthActions } from "../action-types";
import { UserInfo } from "src/app/shered/auth/user-info.model";

export interface AuthState {
    userTokens?: LoginResult,
    userInfo?: UserInfo
}

export const initialAuthState: AuthState = {
    
};

export const authStateReducer = createReducer(
    initialAuthState,

    on(AuthActions.loginCompleated, (state, action) => ({
        ...state, userTokens: action.model
    })),

    on(AuthActions.refreshTokenCompleated, (state, action) => ({
        ...state, userTokens: action.model
    })),

    on(AuthActions.getUserInfoCompleated, (state, action) => ({
        ...state, userInfo: action.model
    })),

    on(AuthActions.logout, (state, action) => ({
        ...state, userTokens: undefined, userInfo: undefined
    })),

    on(AuthActions.refreshTokenField, (state, action) => ({
        ...state, userTokens: undefined, userInfo: undefined
    }))

)