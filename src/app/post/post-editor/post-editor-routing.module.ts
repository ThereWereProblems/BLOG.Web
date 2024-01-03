import { RouterModule, Routes } from "@angular/router";
import { PostListComponent } from "./components/post-list/post-list.component";
import { PostViewComponent } from "./components/post-view/post-view.component";
import { NgModule } from "@angular/core";
import { PostCreateComponent } from "./components/post-create/post-create.component";
import { AuthGuard } from "src/app/auth/auth-data/guard/auth.guard";
import { PostResolver } from "./resolvers/post.resolver";

const routes: Routes = [
    {
        path: 'search',
        component: PostListComponent
    },
    {
        path: 'view/:id',
        component: PostViewComponent,
        resolve: {
            contact: PostResolver
        }
    },
    {
        path: 'create',
        canActivate: [AuthGuard],
        component: PostCreateComponent,
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