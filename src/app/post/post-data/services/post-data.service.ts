import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Post } from "src/app/shered/post/post.model";

@Injectable({
        providedIn: 'root'
})
export class PostDataService{

        
        // lista postów
        private _postData$: BehaviorSubject<Post | undefined> = new BehaviorSubject<Post | undefined>(undefined);

        public get postData$() { return this._postData$.asObservable(); }
    
        public emitPostDataChanged = (record: Post) => this._postData$.next(record);

        // lista postów
        private _postListData$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);

        public get postListData$() { return this._postListData$.asObservable(); }
    
        public emitPostListDataChanged = (records: Post[]) => this._postListData$.next(records);
}