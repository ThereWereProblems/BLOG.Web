import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AuthEditorRoutingModule } from "./auth-editor-routing.module";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AuthEditorRoutingModule
    ],
    providers: [
        //resolvers
    ],
    declarations: [
        RegisterComponent,
        LoginComponent
    ],
})
export class AuthEditorModule { }