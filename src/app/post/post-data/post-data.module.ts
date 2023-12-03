import { CommonModule } from "@angular/common";
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { PostDataEffects } from "./store/post-data.effects";
import { StoreModule } from "@ngrx/store";
import { postDataStateReducer } from "./store/reducers";
import { PostDataService } from "./services/post-data.service";

@NgModule({
    providers: [
        PostDataService
    ],
    imports: [
        CommonModule,
        EffectsModule.forFeature([PostDataEffects]),
        StoreModule.forFeature('Post', postDataStateReducer)
    ],
})
export class PostDataModule{

    constructor(@Optional() @SkipSelf() parentModule: PostDataModule) {
        if(!parentModule) return;

        throw new Error('AuthModule is already loaded!');
    }
}