import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const getRefreshToken = createSelector(
    selectAuthState,
    state => {
        if (state.userTokens){
            return state.userTokens.refreshToken
        }
        return undefined;
    }
)

export const getToken = createSelector(
    selectAuthState,
    state => {
        if (state.userTokens){
            return state.userTokens.accessToken
        }
        return undefined;
    }
)

export const getUserInfo = createSelector(
    selectAuthState,
    state => state.userInfo
)