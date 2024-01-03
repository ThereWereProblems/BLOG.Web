import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Editor, Toolbar } from 'ngx-editor';
import { PostDataActions } from 'src/app/post/post-data/store/action-types';
import { PostDataState } from 'src/app/post/post-data/store/reducers';
import { PostCreate } from 'src/app/shered/post/post-create.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnDestroy {
  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  imageFile!: { link: string; file: any; name: string; };
  selectedFile: any;

  constructor(private store: Store<PostDataState>) {
    this.editor = new Editor();
  }

  selFile(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(form: NgForm) {
    console.log(form);
    let post = new PostCreate();
    post.title = form.value.title;
    post.description = form.value.summary;
    post.content = form.value.content;

    console.log(post);
    console.log(this.selectedFile);

    this.store.dispatch(PostDataActions.createPost({model: post, file: this.selectedFile}));
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}