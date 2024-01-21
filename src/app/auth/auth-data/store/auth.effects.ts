import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthState } from "./reducers";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthActions } from "./action-types";
import { catchError, delay, map, of, switchMap, takeUntil, tap, withLatestFrom } from "rxjs";
import { AuthService } from "../services/auth.service";
import { USER_AUTH_DATA } from "./auth.tokens";
import { UserLocalStorage } from "src/app/shered/auth/user-local-storage.model";
import { getUser } from "./auth.selectors";
import { LoginResult } from "src/app/shered/auth/login-result.model";
import { NotifierService } from "angular-notifier";

@Injectable()
export class AuthEffects {

    constructor(
        private actons$: Actions,
        private store: Store<AuthState>,
        private service: AuthService,
        private router: Router,
        private notifierService: NotifierService
    ) { }


    register$ = createEffect(() => this.actons$.pipe(
        ofType(AuthActions.register),
        switchMap(action => this.service.register(action.model).pipe(
            map(_ => AuthActions.login({ model: action.model })),
            catchError((_) => of(AuthActions.registerField()))
        ))
    ));

    registerField$ = createEffect(() => this.actons$.pipe(
        ofType(AuthActions.registerField),
        tap(_ => this.notifierService.notify("error", "Błąd podczas tworzenia konta!"))
    ), { dispatch: false });

    login$ = createEffect(() => this.actons$.pipe(
        ofType(AuthActions.login),
        switchMap(action => this.service.login(action.model).pipe(
            map(data => AuthActions.loginCompleated({ model: data })),
            catchError((_) => of(AuthActions.loginField()))
        ))
    ));

    loginCompleated$ = createEffect(() => this.actons$.pipe(
        ofType(AuthActions.loginCompleated),
        tap(data => {
            localStorage.setItem(USER_AUTH_DATA, JSON.stringify(data.model));
        }),
        tap(_ => this.router.navigate([''])),
        map(data => AuthActions.refreshTokenTimer({ miliseconds: +data.model.expiresIn! * 1000 }))
    ));

    loginField$ = createEffect(() => this.actons$.pipe(
        ofType(AuthActions.loginField),
        tap(_ => this.notifierService.notify("error", "Błąd autoryzacji!"))
    ), { dispatch: false });

    refreshToken$ = createEffect(() => this.actons$.pipe(
        ofType(AuthActions.refreshToken),
        withLatestFrom(this.store.select(getUser)),
        switchMap(([_, user]) => this.service.refresh({ refreshToken: user?.refreshToken }).pipe(
            map(data => AuthActions.refreshTokenCompleated({ model: data })),
            catchError((_) => of(AuthActions.refreshTokenField()))
        ))
    ));

    refreshTokenCompleated$ = createEffect(() => this.actons$.pipe(
        ofType(AuthActions.refreshTokenCompleated),
        tap(data => {
            localStorage.setItem(USER_AUTH_DATA, JSON.stringify(data.model));
        }),
        map(data => AuthActions.refreshTokenTimer({ miliseconds: +data.model.expiresIn! * 1000 }))
    ));

    refreshTokenField$ = createEffect(() => this.actons$.pipe(
        ofType(AuthActions.refreshTokenField),
        map(_ => AuthActions.logout())
    ));

    refreshTokenTimer$ = createEffect(() => this.actons$.pipe(
        ofType(AuthActions.refreshTokenTimer),
        switchMap(action => of(AuthActions.refreshToken()).pipe(delay(action.miliseconds))
        ),
        takeUntil(this.actons$.pipe(ofType(AuthActions.logout)))
    ));

    refreshTokenFromLocalStorage$ = createEffect(() => this.actons$.pipe(
        ofType(AuthActions.refreshTokenFromLocalStorage),
        switchMap(action => this.service.refresh({ refreshToken: action.token }).pipe(
            map(data => AuthActions.refreshTokenCompleated({ model: data })),
            catchError((_) => of(AuthActions.refreshTokenField()))
        ))
    ));

    loadUserFromLocalStorage$ = createEffect(() => this.actons$.pipe(
        ofType(AuthActions.loadUserFromLocalStorage),
        map(_ => {
            let data = localStorage.getItem(USER_AUTH_DATA);
            if (data) {
                let user: LoginResult = JSON.parse(data);
                return AuthActions.refreshTokenFromLocalStorage({ token: user.refreshToken! })
            } return AuthActions.loadUserFromLocalStorageField()
        })
    ));

    loadUserFromLocalStorageField$ = createEffect(() => this.actons$.pipe(
        ofType(AuthActions.loadUserFromLocalStorageField),
    ), { dispatch: false });

    logout$ = createEffect(() => this.actons$.pipe(
        ofType(AuthActions.logout),
        tap(_ => localStorage.removeItem(USER_AUTH_DATA))
    ), { dispatch: false });
}