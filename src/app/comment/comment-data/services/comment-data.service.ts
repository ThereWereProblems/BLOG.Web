import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Comment } from "src/app/shered/comment/comment.model";

@Injectable({
    providedIn: 'root'
})
export class CommentDataService {

    // lista komentarzy
    private _commentListData$: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([]);

    public get commentListData$() { return this._commentListData$.asObservable(); }

    public emitCommentListDataChanged = (record: Comment[]) => this._commentListData$.next(record);
}

