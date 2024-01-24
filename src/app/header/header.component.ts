import { Component } from '@angular/core';
import { AuthState } from '../auth/auth-data/store/reducers';
import { Store } from '@ngrx/store';
import { getUserInfo } from '../auth/auth-data/store/auth.selectors';
import { Observable } from 'rxjs';
import { LoginResult } from '../shered/auth/login-result.model';
import { AuthActions } from '../auth/auth-data/store/action-types';
import { UserInfo } from '../shered/auth/user-info.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public user$: Observable<UserInfo | undefined>

  constructor(
    private store: Store<AuthState>
  ) {
    store.dispatch(AuthActions.loadUserFromLocalStorage());
    this.user$ = store.select(getUserInfo);
  }

  logout(){
    this.store.dispatch(AuthActions.logout());
  }

}
