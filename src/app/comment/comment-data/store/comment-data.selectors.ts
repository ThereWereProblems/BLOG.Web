import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CommentDataState } from "./reducers";

export const selectPostState = createFeatureSelector<CommentDataState>('Comment');

export const getPager = createSelector(
    selectPostState,
    state => state.dataPager
)