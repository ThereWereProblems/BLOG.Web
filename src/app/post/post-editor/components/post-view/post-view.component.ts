import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PostDataService } from 'src/app/post/post-data/services/post-data.service';
import { Post } from 'src/app/shered/post/post.model';
import { EnvironmentDEV } from 'src/configurations/environment-dev';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent {

  public api: string;
  public post$: Observable<Post | undefined>;

  constructor(store: Store<Post>, service: PostDataService) {
    this.api = EnvironmentDEV.apiLink + "/Post/image/";
    this.post$ = service.postData$;
  }

}
