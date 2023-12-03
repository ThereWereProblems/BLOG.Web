import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Post } from "src/app/shered/post/post.model";

@Injectable()
export class PostDataService{

        // lista postów
        private _postListData$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);

        public get postListData$() { return this._postListData$.asObservable(); }
    
        public emitPostListDataChanged = (records: Post[]) => this._postListData$.next(records);
}