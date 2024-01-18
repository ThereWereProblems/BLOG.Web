import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { CommentDataState } from "./reducers";
import { CommentService } from "../services/comment.service";
import { CommentDataService } from "../services/comment-data.service";
import { CommentDataActions } from "./action-types";
import { catchError, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { getPager } from "./comment-data.selectors";

@Injectable()
export class CommentDataEffects {

    constructor(
        private actons$: Actions,
        private store: Store<CommentDataState>,
        private service: CommentService,
        private commentDataService: CommentDataService
    ) { }

    loadCommentDataList$ = createEffect(() => this.actons$.pipe(
        ofType(CommentDataActions.loadCommentDataList),
        withLatestFrom(this.store.select(getPager)),
        switchMap(([action, pager]) => this.service.search({ pageIndex: pager.pageIndex, pageSize: pager.pageSize }, action.postId).pipe(
            tap(data => this.commentDataService.emitCommentListDataChanged(data.result!)),
            map(data => CommentDataActions.setCommentDataPager({ pager: data.dataPager! })),
            catchError((_) => of(CommentDataActions.loadCommentDataListFaild()))
        ))
    ));

    loadCommentDataListFaild$ = createEffect(() => this.actons$.pipe(
        ofType(CommentDataActions.loadCommentDataListFaild),
        tap(_ => window.alert("Błąd połączenia z serwerem!"))
    ), { dispatch: false });

    loadMoreCommentDataList$ = createEffect(() => this.actons$.pipe(
        ofType(CommentDataActions.loadMoreCommentDataList),
        withLatestFrom(this.store.select(getPager)),
        switchMap(([action, pager]) => this.service.search({ pageIndex: 1, pageSize: pager.pageSize! + 5 }, action.postId).pipe(
            tap(data => this.commentDataService.emitCommentListDataChanged(data.result!)),
            map(data => CommentDataActions.setCommentDataPager({ pager: data.dataPager! })),
            catchError((_) => of(CommentDataActions.loadCommentDataListFaild()))
        ))
    ));

    reloadCommentDataList$ = createEffect(() => this.actons$.pipe(
        ofType(CommentDataActions.reloadCommentDataList),
        withLatestFrom(this.store.select(getPager)),
        switchMap(([action, pager]) => this.service.search({ pageIndex: 1, pageSize: pager.pageSize! }, action.id).pipe(
            tap(data => this.commentDataService.emitCommentListDataChanged(data.result!)),
            map(data => CommentDataActions.setCommentDataPager({ pager: data.dataPager! })),
            catchError((_) => of(CommentDataActions.loadCommentDataListFaild()))
        ))
    ));

    //create
    createComment$ = createEffect(() => this.actons$.pipe(
        ofType(CommentDataActions.createComment),
        switchMap(action => this.service.create(action.model).pipe(
            map(data => CommentDataActions.createCommentComplited()),
            catchError((_) => of(CommentDataActions.loadCommentDataListFaild()))
        ))
    ));

    createCommentComplited$ = createEffect(() => this.actons$.pipe(
        ofType(CommentDataActions.createCommentComplited),
        tap(_ => window.alert("Komentarz dodany!"))
    ), { dispatch: false });

    createCommentField$ = createEffect(() => this.actons$.pipe(
        ofType(CommentDataActions.createCommentField),
        tap(_ => window.alert("Błąd połączenia z serwerem!"))
    ), { dispatch: false });
}