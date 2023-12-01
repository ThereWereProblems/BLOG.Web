import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/auth/auth-data/store/action-types';
import { AuthState } from 'src/app/auth/auth-data/store/reducers';
import { Register } from 'src/app/shered/auth/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(
    private store: Store<AuthState>,
    private router: Router,
    private route: ActivatedRoute,
  ) { }


  onSubmit(form: NgForm) {
    let auth = new Register();
    auth.nickName = form.value.nickName;
    auth.email = form.value.email;
    auth.password = form.value.password;

    this.store.dispatch(AuthActions.register({ model: auth }));
  }
}
