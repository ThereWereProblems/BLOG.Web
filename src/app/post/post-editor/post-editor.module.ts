import { CommonModule, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PostEditorRoutingModule } from "./post-editor-routing.module";
import { PostListComponent } from "./components/post-list/post-list.component";
import { PostViewComponent } from "./components/post-view/post-view.component";
import { NgxPaginationModule } from "ngx-pagination";
import { PostCreateComponent } from './components/post-create/post-create.component';
import { NgxEditorModule } from "ngx-editor";
import { PostResolver } from "./resolvers/post.resolver";
import { CommentListComponent } from "src/app/comment/comment-editor/components/comment-list/comment-list.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PostEditorRoutingModule,
        NgxPaginationModule,
        NgxEditorModule
    ],
    providers: [
        PostResolver
    ],
    declarations: [
        PostListComponent,
        PostViewComponent,
        PostCreateComponent,
        PostViewComponent,
        CommentListComponent
    ]
})
export class PostEditorModule { }