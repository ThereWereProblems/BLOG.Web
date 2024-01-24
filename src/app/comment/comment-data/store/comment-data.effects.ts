import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { CommentDataState } from "./reducers";
import { CommentService } from "../services/comment.service";
import { CommentDataService } from "../services/comment-data.service";
import { CommentDataActions } from "./action-types";
import { catchError, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { getPager } from "./comment-data.selectors";
import { NotifierService } from "angular-notifier";

@Injectable()
export class CommentDataEffects {

    constructor(
        private actons$: Actions,
        private store: Store<CommentDataState>,
        private service: CommentService,
        private commentDataService: CommentDataService,
        private notifierService: NotifierService
    ) { }

    loadCommentDataList$ = createEffect(() => this.actons$.pipe(
        ofType(CommentDataActions.loadCommentDataList),
        switchMap((action) => this.service.search({ pageIndex: 1, pageSize: 5 }, action.postId).pipe(
            tap(data => this.commentDataService.emitCommentListDataChanged(data.result!)),
            map(data => CommentDataActions.setCommentDataPager({ pager: data.dataPager! })),
            catchError((_) => of(CommentDataActions.loadCommentDataListFaild()))
        ))
    ));

    loadCommentDataListFaild$ = createEffect(() => this.actons$.pipe(
        ofType(CommentDataActions.loadCommentDataListFaild),
        tap(_ => this.notifierService.notify("error", "Błąd połączenia z serwerem!"))
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
            catchError((_) => of(CommentDataActions.createCommentField()))
        ))
    ));

    createCommentComplited$ = createEffect(() => this.actons$.pipe(
        ofType(CommentDataActions.createCommentComplited),
        tap(_ => this.notifierService.notify("success", "Komentarz dodany!"))
    ), { dispatch: false });

    createCommentField$ = createEffect(() => this.actons$.pipe(
        ofType(CommentDataActions.createCommentField),
        tap(_ => this.notifierService.notify("error", "Błąd podczas dodawania komentarza!"))
    ), { dispatch: false });

    //delete
    deleteComment$ = createEffect(() => this.actons$.pipe(
        ofType(CommentDataActions.deleteComment),
        switchMap(action => this.service.delete(action.id).pipe(
            map(data => CommentDataActions.deleteCommentComplited()),
            catchError((_) => of(CommentDataActions.deleteCommentField()))
        ))
    ));

    deleteCommentComplited$ = createEffect(() => this.actons$.pipe(
        ofType(CommentDataActions.deleteCommentComplited),
        tap(_ => this.notifierService.notify("success", "Komentarz usunięty!"))
    ), { dispatch: false });

    deleteCommentField$ = createEffect(() => this.actons$.pipe(
        ofType(CommentDataActions.deleteCommentField),
        tap(_ => this.notifierService.notify("error", "Błąd podczas usuwania komentarza!"))
    ), { dispatch: false });
}