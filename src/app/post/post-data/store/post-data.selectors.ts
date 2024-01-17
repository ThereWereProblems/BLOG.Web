import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostDataState } from "./reducers";

export const selectPostState = createFeatureSelector<PostDataState>('Post');

export const getPager = createSelector(
    selectPostState,
    state => state.dataPager
)

export const getCurrentPost = createSelector(
    selectPostState,
    state => state.postId
)