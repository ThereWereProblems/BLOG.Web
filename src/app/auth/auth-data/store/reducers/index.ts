import { createReducer, on } from "@ngrx/store";
import { LoginResult } from "src/app/shered/auth/login-result.model";
import { AuthActions } from "../action-types";

export interface AuthState {
    userData?: LoginResult,
    expiresAt: Date
}

export const initialAuthState: AuthState = {
    expiresAt: new Date()
};

export const authStateReducer = createReducer(
    initialAuthState,

    on(AuthActions.loginCompleated, (state, action) => ({
        ...state, userData: action.model, expiresAt: new Date(new Date().getTime() + (+action.model.expiresIn! * 1000))
    })),

    on(AuthActions.refreshTokenCompleated, (state, action) => ({
        ...state, userData: action.model, expiresAt: new Date(new Date().getTime() + (+action.model.expiresIn! * 1000))
    })),

    on(AuthActions.logout, (state, action) => ({
        ...state, userData: undefined
    })),

    on(AuthActions.refreshTokenField, (state, action) => ({
        ...state, userData: undefined
    }))

)