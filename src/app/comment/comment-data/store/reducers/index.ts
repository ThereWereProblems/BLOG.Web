import { createReducer, on } from "@ngrx/store";
import { DataPager } from "src/app/shered/pager/data-pager.model";
import { CommentDataActions } from "../action-types";

export interface CommentDataState {
    dataPager: DataPager
}

export const initialCommentDataState: CommentDataState = {
    dataPager: { pageIndex: 1, pageSize: 5, totalPages: 1, totalRecords: 1 }
};

export const commentDataStateReducer = createReducer(
    initialCommentDataState,

    on(CommentDataActions.setCommentDataPager, (state, action) => ({
        ...state, dataPager: action.pager
    }))
    
)