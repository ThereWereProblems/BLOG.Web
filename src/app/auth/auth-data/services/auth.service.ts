import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginResult } from "src/app/shered/auth/login-result.model";
import { Login } from "src/app/shered/auth/login.model";
import { RefreshRequest } from "src/app/shered/auth/refresh-request.model";
import { Register } from "src/app/shered/auth/register.model";
import { UserInfo } from "src/app/shered/auth/user-info.model";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class AuthService {

    private api: string;

    constructor(
        private http: HttpClient
    ) {
        this.api = environment.apiUrl;
    }

    public register = (model: Register) =>
        this.http.post(this.api + '/Account/register', model);

    public login = (model: Login): Observable<LoginResult> =>
        this.http.post<LoginResult>(this.api + '/Account/login', model);

    public refresh = (model: RefreshRequest): Observable<LoginResult> =>
        this.http.post<LoginResult>(this.api + '/Account/refresh', model);

    public getInfo = (): Observable<UserInfo> =>
        this.http.get<UserInfo>(this.api + '/Account/userinfo');

}