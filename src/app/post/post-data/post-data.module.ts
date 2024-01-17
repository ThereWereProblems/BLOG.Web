import { CommonModule } from "@angular/common";
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { PostDataEffects } from "./store/post-data.effects";
import { StoreModule } from "@ngrx/store";
import { postDataStateReducer } from "./store/reducers";

@NgModule({
    providers: [
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

        throw new Error('PostModule is already loaded!');
    }
}