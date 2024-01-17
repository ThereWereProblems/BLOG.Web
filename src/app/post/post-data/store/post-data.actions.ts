import { createAction, props } from "@ngrx/store";
import { DataPager } from "src/app/shered/pager/data-pager.model";
import { PostCreate } from "src/app/shered/post/post-create.model";

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

export const setCurrentPost = createAction(
    "[Store] Set Current Post",
    props<{id: number}>()
)

// create
export const createPost = createAction(
    "[CreatePostComponent] Create Post",
    props<{ model: PostCreate, file: any }>()
)

export const createPostComplited = createAction(
    "[CreatePostComponent] Create Post Complited",
    props<{ id: number}>()
)

export const createPostField = createAction(
    "[CreatePostComponent] Create Post Field"
)
