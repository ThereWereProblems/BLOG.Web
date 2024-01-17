import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Comment } from "src/app/shered/comment/comment.model";
import { BaseQuery } from "src/app/shered/pager/base-query";
import { PagedList } from "src/app/shered/pager/paged-list.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private api: string;

    constructor(
        private http: HttpClient
    ) {
        this.api = environment.apiUrl;
    }

    public search = (model: BaseQuery, postId: number): Observable<PagedList<Comment>> =>
        this.http.get<PagedList<Comment>>(this.api + '/Comment/search',
            {
                params: {
                    pageIndex: model.pageIndex!,
                    pageSize: model.pageSize!,
                    postId: postId
                }
            });

    public create = (model: Comment) =>
        this.http.post(this.api + '/Comment/create', model);
}