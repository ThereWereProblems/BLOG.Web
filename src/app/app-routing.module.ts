import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('src/app/auth/auth-editor/auth-editor.module').then(m => m.AuthEditorModule)
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '*', redirectTo: '', pathMatch: 'full' },
  // { path: '**', component:  } dodać jakiś komponent 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
