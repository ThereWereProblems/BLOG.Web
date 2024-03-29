import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseQuery } from "src/app/shered/pager/base-query";
import { PagedList } from "src/app/shered/pager/paged-list.model";
import { PostCreate } from "src/app/shered/post/post-create.model";
import { Post } from "src/app/shered/post/post.model";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class PostService {

    private api: string;

    constructor(
        private http: HttpClient
    ) {
        this.api = environment.apiUrl;
    }

    public get = (id: number): Observable<Post> =>
        this.http.get<Post>(this.api + '/Post/' + id);

    public search = (model: BaseQuery): Observable<PagedList<Post>> =>
        this.http.get<PagedList<Post>>(this.api + '/Post/search',
            {
                params: {
                    pageIndex: model.pageIndex!,
                    pageSize: model.pageSize!
                }
            });

    public create = (model: PostCreate, file: File): Observable<HttpResponse<number>> => {
        const formData = new FormData();
        formData.append('model', JSON.stringify(model));
        formData.append('file', file);
        return this.http.post<number>(this.api + '/Post/create', formData, {
            observe: 'response'
        })
    }
}