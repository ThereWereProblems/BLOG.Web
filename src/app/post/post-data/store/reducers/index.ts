import { createReducer, on } from "@ngrx/store";
import { DataPager } from "src/app/shered/pager/data-pager.model";
import { PostDataActions } from "../action-types";
import { state } from "@angular/animations";
import { Action } from "rxjs/internal/scheduler/Action";

export interface PostDataState {
    dataPager: DataPager,
    postId: number
}

export const initialPostDataState: PostDataState = {
    dataPager: { pageIndex: 1, pageSize: 20, totalPages: 1, totalRecords: 1 },
    postId: 0
};

export const postDataStateReducer = createReducer(
    initialPostDataState,

    on(PostDataActions.setPostDataPager, (state, action) => ({
        ...state, dataPager: action.pager
    })),

    on(PostDataActions.setCurrentPost, (state, action) => ({
        ...state, postId: action.id 
    }))
    
)