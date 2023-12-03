import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PostEditorRoutingModule } from "./post-editor-routing.module";
import { PostListComponent } from "./components/post-list/post-list.component";
import { PostViewComponent } from "./components/post-view/post-view.component";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        PostEditorRoutingModule,
        NgxPaginationModule
    ],
    providers:[
        // resolvers,
    ],
    declarations:[
        PostListComponent,
        PostViewComponent
    ]
})
export class PostEditorModule{}