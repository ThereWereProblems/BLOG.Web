import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Post } from "src/app/shered/post/post.model";
import { PostDataState } from "../../post-data/store/reducers";
import { PostService } from "../../post-data/services/post.service";
import { PostDataService } from "../../post-data/services/post-data.service";
import { tap } from "rxjs";

@Injectable()
export class PostResolver implements Resolve<Post>{

    constructor(
        private store: Store<PostDataState>,
        private service: PostService,
        private postDataService: PostDataService
    ) { }

    resolve = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        if(!+route.paramMap.get('id')!) return {};

        return this.service.get(+route.paramMap.get('id')!).pipe(
            tap(data => this.postDataService.emitPostDataChanged(data))
        )
    }
}