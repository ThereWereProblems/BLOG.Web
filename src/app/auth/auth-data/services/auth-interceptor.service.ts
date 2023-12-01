import { Injectable } from "@angular/core";
import { Observable, exhaustMap, take } from "rxjs";
import { AuthState } from "../store/reducers";
import { Store } from "@ngrx/store";
import { getToken } from "../store/auth.selectors";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    private token: Observable<string | undefined>;

    constructor(
        store: Store<AuthState>
    ) {
        this.token = store.select(getToken);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.token.pipe(
            take(1),
            exhaustMap(bearer => {
                if(bearer){
                    const modifiedReq = req.clone({
                        setHeaders: {
                            Authorization: 'Bearer ' + bearer
                        }
                    });
                    return next.handle(modifiedReq);
                }
                return next.handle(req);
            })
        )
    }
}