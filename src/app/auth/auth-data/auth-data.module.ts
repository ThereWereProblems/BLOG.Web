import { CommonModule } from "@angular/common";
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { authStateReducer } from "./store/reducers";
import { AuthEffects } from "./store/auth.effects";

@NgModule({
    providers: [
    ],
    imports: [
        CommonModule,
        EffectsModule.forFeature([AuthEffects]),
        StoreModule.forFeature('auth', authStateReducer)
    ],
})
export class AuthDataModule{

    constructor(@Optional() @SkipSelf() parentModule: AuthDataModule) {
        if(!parentModule) return;

        throw new Error('AuthDataModule is already loaded!');
    }
}