import { createAction, props } from "@ngrx/store";
import { LoginResult } from "src/app/shered/auth/login-result.model";
import { Login } from "src/app/shered/auth/login.model";
import { Register } from "src/app/shered/auth/register.model";
import { UserInfo } from "src/app/shered/auth/user-info.model";

export const register = createAction(
    "[RegisterComponent] Register",
    props<{ model: Register }>()
)

export const registerCompleated = createAction(
    "[RegisterComponent] Register Compleated"
)

export const registerField = createAction(
    "[RegisterComponent] Register Field"
)

export const login = createAction(
    "[LoginComponent] Login",
    props<{ model: Login }>()
)

export const loginCompleated = createAction(
    "[Store] Login Compleated",
    props<{ model: LoginResult }>()
)

export const loginField = createAction(
    "[LoginComponent] Login Field"
)

export const refreshToken = createAction(
    "[Store] Refresh Token"
)

export const refreshTokenCompleated = createAction(
    "[Store] Refresh Token Compleated",
    props<{ model: LoginResult }>()
)

export const refreshTokenField = createAction(
    "[Store] Refresh Token Field"
)

export const refreshTokenTimer = createAction(
    "[Store] Refresh Token Timer",
    props<{ miliseconds: number }>()
)

export const refreshTokenFromLocalStorage = createAction(
    "[Store] Refresh Token From Local Storage",
    props<{ token: string }>()
)

export const refreshTokenFromLocalStorageCompleated = createAction(
    "[Store] Refresh Token From Local Storage Compleated",
    props<{ model: LoginResult }>()
)

export const loadUserFromLocalStorage = createAction(
    "[HederComponent] Load User From Local Storage"
)

export const loadUserFromLocalStorageField = createAction(
    "[HederComponent] Load User From Local Storage Field"
)

export const logout = createAction(
    "[Store] Logout"
)

export const getUserInfo = createAction(
    "[Store] Get User Info"
)

export const getUserInfoCompleated = createAction(
    "[Store] Get User Info Compleated",
    props<{ model: UserInfo }>()
)

export const getUserInfoField = createAction(
    "[Store] Get User Info Field"
)
