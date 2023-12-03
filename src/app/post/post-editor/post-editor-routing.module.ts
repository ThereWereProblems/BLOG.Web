import { RouterModule, Routes } from "@angular/router";
import { PostListComponent } from "./components/post-list/post-list.component";
import { PostViewComponent } from "./components/post-view/post-view.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: 'search',
        component: PostListComponent
    },
    {
        path: 'view/:id',
        component: PostViewComponent,
        // resolve: {
        //     contact: PostResolver
        // }
    },
    {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostEditorRoutingModule { }