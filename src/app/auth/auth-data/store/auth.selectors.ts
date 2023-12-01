import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const getUser = createSelector(
    selectAuthState,
    state => state.userData
)

export const getToken = createSelector(
    selectAuthState,
    state => {
        if (state.userData){
            return state.userData.accessToken
        }
        return undefined;
    }
)