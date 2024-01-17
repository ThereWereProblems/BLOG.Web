import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PostDataService } from 'src/app/post/post-data/services/post-data.service';
import { PostDataActions } from 'src/app/post/post-data/store/action-types';
import { Post } from 'src/app/shered/post/post.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnDestroy {

  public api: string;
  public post$: Observable<Post | undefined>;

  constructor(private store: Store<Post>, service: PostDataService) {
    this.api = environment.apiUrl + "/File/image/";
    this.post$ = service.postData$;
  }
  
  ngOnDestroy(): void {
    this.store.dispatch(PostDataActions.setCurrentPost({ id: 0 }));
  }
}
