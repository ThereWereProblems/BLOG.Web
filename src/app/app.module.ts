import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthDataModule } from './auth/auth-data/auth-data.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AuthInterceptorService } from './auth/auth-data/services/auth-interceptor.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NotFoundComponent } from './not-found/not-found.component';
import { PostDataModule } from './post/post-data/post-data.module';
import { CommentDataModule } from './comment/comment-data/comment-data.module';
import { SignalrService } from './signalr.service';
import { appStateReducer } from './store/reducers';
import { NotifierModule } from 'angular-notifier';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent
  ],
  imports: [
    NotifierModule.withConfig({
      position: {
        vertical: {
          position: 'top'
        },
      },
      behaviour: {
        autoHide: 3000
      }    
    }),
    HttpClientModule,
    AuthDataModule,
    CommentDataModule,
    PostDataModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({appStateReducer}),
    EffectsModule.forRoot([])
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    SignalrService,
    {
      provide: APP_INITIALIZER,
      useFactory: (signalrService: SignalrService) => () => signalrService.initiateSignalrConnection(),
      deps: [SignalrService],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
