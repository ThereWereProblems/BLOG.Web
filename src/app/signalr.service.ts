import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as signalR from '@microsoft/signalr';
import { AppState } from './store/reducers';
import { Store } from '@ngrx/store';
import { getCurrentPost } from './post/post-data/store/post-data.selectors';
import { map, tap, withLatestFrom } from 'rxjs';
import { CommentDataActions } from './comment/comment-data/store/action-types';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  hubUrl: string;
  connection: any;

  constructor(private store: Store<AppState>) {
    this.hubUrl = environment.signalrUrl;
  }

  public async initiateSignalrConnection(): Promise<void> {
    try {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(this.hubUrl)
        .withAutomaticReconnect()
        .build();

      await this.connection.start({ withCredentials: false });
      this.setSignalrClientMethods();

      console.log(`SignalR connection success!`);
    }
    catch (error) {
      console.log(`SignalR connection error: ${error}`);
    }
  }

  private setSignalrClientMethods(): void {
    this.connection.on('ReloadComments', (id: number) => {
      this.store.select(getCurrentPost).subscribe(item => {
        if (item == id)
          this.store.dispatch(CommentDataActions.reloadCommentDataList({ id: id }))
      }).unsubscribe();
    });
  }
}
