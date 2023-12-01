import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/auth/auth-data/store/action-types';
import { AuthState } from 'src/app/auth/auth-data/store/reducers';
import { Login } from 'src/app/shered/auth/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private store: Store<AuthState>,
    private router: Router,
    private route: ActivatedRoute,
  ) { }


  onSubmit(form: NgForm) {
    let auth = new Login();
    auth.email = form.value.email;
    auth.password = form.value.password;

    this.store.dispatch(AuthActions.login({ model: auth }));
  }
}
