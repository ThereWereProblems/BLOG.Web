import { createAction, props } from "@ngrx/store";
import { DataPager } from "src/app/shered/pager/data-pager.model";

export const loadPostDataList = createAction(
    "[PostListComponent] Load Post Data List"
)

export const loadPostDataListFaild = createAction(
    "[PostListComponent] Load Post Data List Faild"
)

export const changePagePostDataList = createAction(
    "[PostListComponent] Change Page Post Data List",
    props<{ pageNumber: number }>()
)

export const setPostDataPager = createAction(
    "[Store] Set Post Data Pager",
    props<{ pager: DataPager }>()
)

