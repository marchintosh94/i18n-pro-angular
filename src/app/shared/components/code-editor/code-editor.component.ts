import {
  Component,
  input,
  model,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CopyClipboardComponent } from '../copy-clipboard/copy-clipboard.component';

@Component({
  selector: 'msh-code-editor',
  imports: [FormsModule, CopyClipboardComponent],
  template: `
    <div class="code-editor-header" [class]="validContent() ? '' : 'error'">
      <div class="flex items-center justify-between">
        <div class="flex space-x-1">
          <button disabled class="btn-window close"></button>
          <button disabled class="btn-window minify"></button>
          <button disabled class="btn-window minify"></button>
        </div>
        <div class="flex space-x-2">
          <msh-copy-clipboard
            [class]="
              'text-slate-400 hover:text-slate-300 def-transition py-1.5'
            "
            [showText]="false"
            [content]="content()"
          />
          <button
            class="text-slate-400 hover:text-slate-300 def-transition py-1.5"
            (click)="resetContent()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      @if(fileName()){
        <div class="filenamebox">
          {{ fileName() }}
        </div>
      }
    </div>
    <div
      class="code-editor-container"
      [class]="validContent() ? '' : 'code-error error'"
    >
      <div class="line-numbers">
        @for (line of lineNumbers; track $index) {
        <span class="block">{{ line }}</span>
        }
      </div>

      <pre class="code-editor-prettier" [innerHTML]="prettifiedContent()"></pre>
      <textarea
        (ngModelChange)="content.set($event)"
        [ngModel]="content()"
        (input)="onInput($event)"
        (keydown)="onKeyDown($event)"
        class="code-editor"
        [class]="validContent() ? '' : 'code-error'"
        spellcheck="false"
        [rows]="initialRows()"
      ></textarea>
      <pre class="code-error-block">{{ errorMessage() }}</pre>
    </div>
  `,
  styles: `
    .code-editor-container {
      @apply relative flex bg-slate-800 border-b border-x border-slate-700 rounded-b-lg font-mono text-slate-200;
    }
    .line-numbers {
      @apply bg-slate-900 text-right text-slate-400 select-none p-2 min-w-[40px] rounded-bl-lg;
    }
    .line {
      @apply block leading-6 text-sm;
    }
    .code {
      @apply text-sm leading-6 resize-none font-mono whitespace-pre outline-none rounded-b-lg;
    }
    .code-editor {
      @apply relative flex-1 bg-transparent p-2 overflow-auto caret-slate-200 text-transparent code;
    }
    .code-editor-prettier {
      @apply def-transition absolute top-0 left-[40px] w-[calc(100%-40px)] h-full p-2 bg-slate-800 text-slate-200 overflow-auto pointer-events-none code;
    }
    .code-error-block {
      @apply absolute top-0 right-0 backdrop-blur-md bg-white/5 code text-red-600 px-2
    }
    .code-error {
      @apply bg-red-800/10
    }
    .code-editor-header {
      @apply relative px-3 border border-slate-700 rounded-t-lg bg-slate-800;
    }
    .btn-window {
      @apply w-3 h-3 rounded-full bg-slate-700 border border-slate-600;
    }
    .error {
      @apply border-red-700/60
    }
    .filenamebox {
      @apply absolute bottom-0 left-20 px-2 z-10 text-slate-400 text-sm bg-clip-text text-transparent bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center;
    }
    .filenamebox::after {
      @apply content-[""] absolute bottom-0 w-full h-[1px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500;
    }
  `,
  encapsulation: ViewEncapsulation.None,
})
export class CodeEditorComponent implements OnInit {
  initialRows = input(4);
  fileName = input<string>('');
  content = model('');
  validatorFunction = input<(value: string) => boolean>();
  errorMessage = input<string>('');
  prettifiedContent = signal('');
  validContent = signal(true);
  lineNumbers: number[] = [];

  ngOnInit() {
    this.updateContent(this.content());
  }

  onInput(event: Event) {
    const inputContent = (event.target as HTMLTextAreaElement).value;
    this.updateContent(inputContent);
    if (this.validatorFunction()) {
      const isValid = this.validatorFunction()!(inputContent);
      this.validContent.set(isValid);
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      const textarea = event.target as HTMLTextAreaElement;
      const { selectionStart, selectionEnd } = textarea;

      const updatedContent = `${this.content().slice(
        0,
        selectionStart
      )}  ${this.content().slice(selectionEnd)}`;
      this.content.set(updatedContent);
      this.updateContent(updatedContent);

      const newSelectionStart = selectionStart + 2;
      const newSelectionEnd = selectionEnd + 2;
      textarea.value = updatedContent;
      textarea.setSelectionRange(newSelectionStart, newSelectionEnd);
    }
  }

  updateLineNumbers() {
    const contentLines = this.content().split('\n').length;
    const totalLines =
      contentLines > this.initialRows() ? contentLines : this.initialRows();
    this.lineNumbers = Array.from({ length: totalLines }, (_, i) => i + 1);
  }

  prettifyContent(value: string) {
    // Syntax highlighting logic
    this.prettifiedContent.set(
      value
        .replace(/"([^"]*)"/g, '<span class="text-[#f4064b]">"$1"</span>') // Strings in orange
        .replace(/{/g, '<span class="text-fuchsia-500">{</span>')
        .replace(/}/g, '<span class="text-fuchsia-500">}</span>')
    );
  }

  updateContent(value: string) {
    this.prettifyContent(value);
    this.updateLineNumbers();
  }
  resetContent() {
    this.content.set('');
    this.updateContent('');
  }
}
