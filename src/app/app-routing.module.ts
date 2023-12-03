import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('src/app/auth/auth-editor/auth-editor.module').then(m => m.AuthEditorModule)
  },
  {
    path: 'post',
    loadChildren: () => import('src/app/post/post-editor/post-editor.module').then(m => m.PostEditorModule)
  },
  { path: '', redirectTo: 'post', pathMatch: 'full' },
  { path: '*', redirectTo: '', pathMatch: 'full' },
   { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
