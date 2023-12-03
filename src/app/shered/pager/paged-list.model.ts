import { DataPager } from "./data-pager.model";

export class PagedList<T>{
    dataPager?: DataPager;
    result?: T[] 
}