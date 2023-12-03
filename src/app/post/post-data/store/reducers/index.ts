import { createReducer, on } from "@ngrx/store";
import { DataPager } from "src/app/shered/pager/data-pager.model";
import { PostDataActions } from "../action-types";

export interface PostDataState {
    dataPager: DataPager
}

export const initialPostDataState: PostDataState = {
    dataPager: { pageIndex: 1, pageSize: 20, totalPages: 1, totalRecords: 1 }
};

export const postDataStateReducer = createReducer(
    initialPostDataState,

    on(PostDataActions.setPostDataPager, (state, action) => ({
        ...state, dataPager: action.pager
    }))
    
)