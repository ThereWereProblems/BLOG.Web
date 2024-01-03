import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PostDataService } from 'src/app/post/post-data/services/post-data.service';
import { PostDataActions } from 'src/app/post/post-data/store/action-types';
import { getPager } from 'src/app/post/post-data/store/post-data.selectors';
import { PostDataState } from 'src/app/post/post-data/store/reducers';
import { DataPager } from 'src/app/shered/pager/data-pager.model';
import { Post } from 'src/app/shered/post/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  public postList$: Observable<Post[]>;
  public dataPager$: Observable<DataPager>;

  constructor(private store: Store<PostDataState>,
    private router: Router,
    service: PostDataService) {
    this.postList$ = service.postListData$
    this.dataPager$ = store.select(getPager);

    store.dispatch(PostDataActions.loadPostDataList())
  }

  handlePageChange(event: number): void {
    this.store.dispatch(PostDataActions.changePagePostDataList({ pageNumber: event }))
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }

  public showDetail(id: number){
    this.router.navigate(['post', 'view', id]);

  }

}
