import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { PostDataState } from "./reducers";
import { PostService } from "../services/post.service";
import { PostDataService } from "../services/post-data.service";
import { Router } from "@angular/router";
import { PostDataActions } from "./action-types";
import { catchError, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { getPager } from "./post-data.selectors";

@Injectable()
export class PostDataEffects {

    constructor(
        private actons$: Actions,
        private store: Store<PostDataState>,
        private service: PostService,
        private postDataService: PostDataService,
        private router: Router
    ) { }

    loadPostDataList$ = createEffect(() => this.actons$.pipe(
        ofType(PostDataActions.loadPostDataList),
        withLatestFrom(this.store.select(getPager)),
        switchMap(([_, pager]) => this.service.search({ pageIndex: pager.pageIndex, pageSize: pager.pageSize }).pipe(
            tap(data => this.postDataService.emitPostListDataChanged(data.result!)),
            map(data => PostDataActions.setPostDataPager({ pager: data.dataPager! })),
            catchError((_) => of(PostDataActions.loadPostDataListFaild()))
        ))
    ));

    loadPostDataListFaild$ = createEffect(() => this.actons$.pipe(
        ofType(PostDataActions.loadPostDataListFaild),
        tap(_ => window.alert("Błąd połączenia z serwerem!"))
    ), { dispatch: false });

    changePagePostDataList$ = createEffect(() => this.actons$.pipe(
        ofType(PostDataActions.changePagePostDataList),
        withLatestFrom(this.store.select(getPager)),
        switchMap(([action, pager]) => this.service.search({ pageIndex: action.pageNumber, pageSize: pager.pageSize }).pipe(
            tap(data => this.postDataService.emitPostListDataChanged(data.result!)),
            map(data => PostDataActions.setPostDataPager({ pager: data.dataPager! })),
            catchError((_) => of(PostDataActions.loadPostDataListFaild()))
        ))
    ));

    //create post
    createPost$ = createEffect(() => this.actons$.pipe(
        ofType(PostDataActions.createPost),
        switchMap((action) => this.service.create(action.model, action.file).pipe(
            map(data => PostDataActions.createPostComplited({id: data.body!})),
            catchError((_) => of(PostDataActions.createPostField()))
        ))
    ));

    createPostComplited$ = createEffect(() => this.actons$.pipe(
        ofType(PostDataActions.createPostComplited),
        tap(_ => window.alert("Wpis dodany pomyślnie!")),
        tap(data => this.router.navigate(['post', 'view', data.id]))
    ), { dispatch: false });

    createPostField$ = createEffect(() => this.actons$.pipe(
        ofType(PostDataActions.createPostField),
        tap(_ => window.alert("Błąd podczas dodawania wpisu!"))
    ), { dispatch: false });
}