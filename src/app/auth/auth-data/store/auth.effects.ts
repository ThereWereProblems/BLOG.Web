import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthState } from "./reducers";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthActions } from "./action-types";
import { catchError, delay, map, of, switchMap, takeUntil, tap, withLatestFrom } from "rxjs";
import { AuthService } from "../services/auth.service";
import { USER_AUTH_DATA } from "./auth.tokens";
import { getRefreshToken } from "./auth.selectors";
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

    // register
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

    // login
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

    loginCompleated2$ = createEffect(() => this.actons$.pipe(
        ofType(AuthActions.loginCompleated),
        map(data => AuthActions.getUserInfo())
    ));

    loginField$ = createEffect(() => this.actons$.pipe(
        ofType(AuthActions.loginField),
        tap(_ => this.notifierService.notify("error", "Błąd autoryzacji!"))
    ), { dispatch: false });


    //refresh token
    refreshToken$ = createEffect(() => this.actons$.pipe(
        ofType(AuthActions.refreshToken),
        withLatestFrom(this.store.select(getRefreshToken)),
        switchMap(([_, token]) => this.service.refresh({ refreshToken: token }).pipe(
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

    // local storage
    refreshTokenFromLocalStorage$ = createEffect(() => this.actons$.pipe(
        ofType(AuthActions.refreshTokenFromLocalStorage),
        switchMap(action => this.service.refresh({ refreshToken: action.token }).pipe(
            map(data => AuthActions.refreshTokenFromLocalStorageCompleated({ model: data })),
            //map(_ => AuthActions.getUserInfo()),
            catchError((_) => of(AuthActions.refreshTokenField()))
        ))
    ));

    refreshTokenFromLocalStorageCompleated$ = createEffect(() => this.actons$.pipe(
        ofType(AuthActions.refreshTokenFromLocalStorageCompleated),
        map(data => AuthActions.refreshTokenCompleated({ model: data.model })),
    ));

    refreshTokenFromLocalStorageCompleated2$ = createEffect(() => this.actons$.pipe(
        ofType(AuthActions.refreshTokenFromLocalStorageCompleated),
        map(data => AuthActions.getUserInfo()),
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

    // logout
    logout$ = createEffect(() => this.actons$.pipe(
        ofType(AuthActions.logout),
        tap(_ => localStorage.removeItem(USER_AUTH_DATA))
    ), { dispatch: false });

    // get user info
    getUserInfo$ = createEffect(() => this.actons$.pipe(
        ofType(AuthActions.getUserInfo),
        switchMap(_ => this.service.getInfo().pipe(
            map(data => AuthActions.getUserInfoCompleated({ model: data })),
            catchError((_) => of(AuthActions.getUserInfoField()))
        ))
    ));

    getUserInfoField$ = createEffect(() => this.actons$.pipe(
        ofType(AuthActions.getUserInfoField),
        tap(_ => this.notifierService.notify("error", "Błąd połączenia z serwerem!"))
    ), { dispatch: false });
}