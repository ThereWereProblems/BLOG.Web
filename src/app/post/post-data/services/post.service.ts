import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseQuery } from "src/app/shered/pager/base-query";
import { PagedList } from "src/app/shered/pager/paged-list.model";
import { Post } from "src/app/shered/post/post.model";
import { EnvironmentDEV } from "src/configurations/environment-dev";

@Injectable({ providedIn: 'root' })
export class PostService {

    private api: string;

    constructor(
        private http: HttpClient
    ) {
        this.api = EnvironmentDEV.apiLink;
    }


    public search = (model: BaseQuery): Observable<PagedList<Post>> =>
        this.http.get<PagedList<Post>>(this.api + '/Post/search',
            {
                params: { 
                    pageIndex: model.pageIndex!,
                    pageSize: model.pageSize! 
                }
            });
}