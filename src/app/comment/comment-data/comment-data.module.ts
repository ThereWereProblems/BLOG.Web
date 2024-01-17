import { CommonModule } from "@angular/common";
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { commentDataStateReducer } from "./store/reducers";
import { StoreModule } from "@ngrx/store";
import { CommentDataEffects } from "./store/comment-data.effects";

@NgModule({
    providers: [
    ],
    imports: [
        CommonModule,
        EffectsModule.forFeature([CommentDataEffects]),
        StoreModule.forFeature('Comment', commentDataStateReducer)
    ],
})
export class CommentDataModule{

    constructor(@Optional() @SkipSelf() parentModule: CommentDataModule) {
        if(!parentModule) return;

        throw new Error('CommentModule is already loaded!');
    }
}