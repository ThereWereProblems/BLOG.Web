import { createAction, props } from "@ngrx/store"
import { Comment } from "src/app/shered/comment/comment.model"
import { DataPager } from "src/app/shered/pager/data-pager.model"

export const loadCommentDataList = createAction(
    "[CommentListComponent] Load Comment Data List",
    props<{ postId: number }>()
)

export const loadCommentDataListFaild = createAction(
    "[CommentListComponent] Load Comment Data List Faild"
)

export const loadMoreCommentDataList = createAction(
    "[CommentListComponent] Load More Comment Data List",
    props<{ postId: number }>()
)

export const setCommentDataPager = createAction(
    "[Store] Set Comment Data Pager",
    props<{ pager: DataPager }>()
)

export const reloadCommentDataList = createAction(
    "[CommentListComponent] Reload Comment Data List",
    props<{ id: number }>()
)

// create
export const createComment = createAction(
    "[CommentListComponent] Create Comment",
    props<{ model: Comment }>()
)

export const createCommentComplited = createAction(
    "[CommentListComponent] Create Comment Complited"
)

export const createCommentField = createAction(
    "[CommentListComponent] Create Comment Field"
)

// delete
export const deleteComment = createAction(
    "[CommentListComponent] Delete Comment",
    props<{ id: number }>()
)

export const deleteCommentComplited = createAction(
    "[CommentListComponent] Delete Comment Complited"
)

export const deleteCommentField = createAction(
    "[CommentListComponent] Delete Comment Field"
)