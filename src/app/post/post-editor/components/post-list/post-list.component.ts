import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { PostDataService } from 'src/app/post/post-data/services/post-data.service';
import { PostDataActions } from 'src/app/post/post-data/store/action-types';
import { getPager } from 'src/app/post/post-data/store/post-data.selectors';
import { PostDataState } from 'src/app/post/post-data/store/reducers';
import { DataPager } from 'src/app/shered/pager/data-pager.model';
import { Post } from 'src/app/shered/post/post.model';
import { EnvironmentDEV } from 'src/configurations/environment-dev';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  public postList$: Observable<Post[]>;
  public dataPager$: Observable<DataPager>;
  public api: string;

  constructor(private store: Store<PostDataState>,
    private router: Router,
    service: PostDataService,
    datepipe: DatePipe) {
    this.api = EnvironmentDEV.apiLink + "/Post/image/";
    this.dataPager$ = store.select(getPager);

    this.postList$ = service.postListData$.pipe(
      map(data => {
        data.forEach(post => {
          Object.keys(post).forEach(key => {
            let curentValue = (post as any)[key];

            switch (key) {
              case 'publishedAt':
                post[key] = new Date(curentValue);
                break;
            }
          })
        });
        return data;
      })
    );

    store.dispatch(PostDataActions.loadPostDataList())
  }

  handlePageChange(event: number): void {
    this.store.dispatch(PostDataActions.changePagePostDataList({ pageNumber: event }))
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }

  public showDetail(id: number) {
    this.router.navigate(['post', 'view', id]);

  }

}
