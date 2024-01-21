import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { getUser } from 'src/app/auth/auth-data/store/auth.selectors';
import { CommentDataService } from 'src/app/comment/comment-data/services/comment-data.service';
import { CommentDataActions } from 'src/app/comment/comment-data/store/action-types';
import { loadCommentDataList } from 'src/app/comment/comment-data/store/comment-data.actions';
import { getPager } from 'src/app/comment/comment-data/store/comment-data.selectors';
import { PostDataState } from 'src/app/post/post-data/store/reducers';
import { LoginResult } from 'src/app/shered/auth/login-result.model';
import { Comment } from 'src/app/shered/comment/comment.model';
import { DataPager } from 'src/app/shered/pager/data-pager.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent {

  public user$: Observable<LoginResult | undefined>
  public commentList$: Observable<Comment[]>;
  public postId: number;
  public pager$: Observable<DataPager>;

  constructor(private store: Store<PostDataState>,
    service: CommentDataService,
    route: ActivatedRoute) {

    this.postId = +route.snapshot.paramMap.get('id')!;
    this.user$ = store.select(getUser);
    this.pager$ = store.select(getPager);

    this.commentList$ = service.commentListData$.pipe(
      map(data => {
        data.forEach(comment => {
          Object.keys(comment).forEach(key => {
            let curentValue = (comment as any)[key];

            switch (key) {
              case 'publishedAt':
                comment[key] = new Date(curentValue);
                break;
            }
          })
        });
        return data;
      })
    );

    store.dispatch(loadCommentDataList({ postId: this.postId }));
  }

  onSubmit(form: NgForm) {
    let comment = {
      postId: this.postId,
      content: form.value.comment
    } as Comment;
    this.store.dispatch(CommentDataActions.createComment({ model: comment }));
    form.resetForm();
  }

  showMore() {
    this.store.dispatch(CommentDataActions.loadMoreCommentDataList({ postId: this.postId }))
  }

}
