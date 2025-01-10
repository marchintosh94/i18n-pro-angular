import { Component, inject, signal } from '@angular/core';
import { I18nProService } from 'i18n-pro-angular';
import { CodeEditorComponent } from "../../../shared/components/code-editor/code-editor.component";

@Component({
  selector: 'msh-translate-section',
  imports: [CodeEditorComponent],
  template: `
    <section class="mt-8">
      <h2 class="subtitle">Translation</h2>
      <p class="text-base/6">
        To translate a string, you need to use the <code>t</code> function
        provided by the library. The function takes the dictionary and the key
        of the translation as arguments. You can also pass an object with the
        placeholders as the third argument.
      </p>
      <div class="space-y-2 mt-2 max-w-[90%] mx-auto">
        <msh-code-editor
          [(content)]="codeUsageTMethod"
          [disabled]="true"
          fileName="app.component.ts"
        />
      </div>
      <div class="space-y-2 mt-2">
        <p class="section-title">Example</p>
        <p class="text-base/6">
          Here is an example of how wokrs the <code>t</code> function.
        </p>
        <div class="flex space-x-4">
          <div class="lg:max-w-[60%]">
            <msh-code-editor
              [validatorFunction]="validateContent"
              [(content)]="dictionary"
              fileName="en-us.json"
              [errorMessage]="validationErrorMessage()"
            />
            <p class="subtitle text-sm/6">
              You can use the code editor to edit the dictionary content. The
              code editor will validate the content and display an error message
              if the content is not valid.
            </p>
          </div>
          <div class="bg-slate-800 border border-slate-700 flex-1 rounded-lg p-4">
            <div class="flex space-x-4">
              <button
                (click)="translateText()"
                class="border border-slate-400 px-3 rounded-lg mb-6"
              >
                Translate
              </button>
              <button
                (click)="resetText()"
                class="border border-slate-400 px-3 rounded-lg mb-6"
              >
                Reset
              </button>
            </div>
            <p>
              {{ translationExampleTextLine1 }}<br />
              {{ translationExampleTextLine2 }}<br />
              {{ translationExampleTextLine3 }}
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host{
      display:
    }
  `,
})
export class TranslateSectionComponent {
  translationExampleTextLine1 = 'hello';
  translationExampleTextLine2 = 'my_name';
  translationExampleTextLine3 = 'question_apple';

  private initialDictionary = `{
    "hello": "Hello, World!",
    "my_name": "My name is {name}.",
    "question_apple": "Dou you want an apple? | Do you want {count} apples?"
}`;
  private i18nProService = inject(I18nProService);
  codeUsageTMethod = `
  import { Component, OnInit, inject } from '@angular/core';
  import { I18nProService } from 'i18n-pro-angular';

  @Component({
    selector: 'app-root',
    imports: [],
    template: \`&lt;p&gt;
      {{ translationExampleTextLine1 }}&lt;br \/&gt;
      {{ translationExampleTextLine2 }}&lt;br \/&gt;
      {{ translationExampleTextLine3 }}
    &lt;p&gt;\`,
  })
  export class AppComponent implements OnInit {
    private i18nProService = inject(I18nProService);
    dictionary = {
      hello: 'Hello, World!',
      my_name: 'My name is {name}.',
      question_apple: 'Dou you want an apple? | Do you want {count} apples?'
    };

    ngOnInit(): void {
      this.i18nProService
      .setLocalizedDictionary('en-us', this.dictionary)
      .subscribe(() => {
        //Simple translation
        this.translationExampleTextLine1 = this.i18nProService.t(
          this.translationExampleTextLine1
        );
        //Translation and dynamic placeholder replacement
        this.translationExampleTextLine2 = this.i18nProService.t(
          this.translationExampleTextLine2,
          { name: 'Joe' }
        );
        //Translation with dynamic placeholder replacement and pluralization
        this.translationExampleTextLine3 = this.i18nProService.t(
          this.translationExampleTextLine3,
          2,
          { count: 2 }
        );
      });
    }
  }
  `;
  dictionary = `${this.initialDictionary}`;
  validationErrorMessage = signal('');

  validateContent = (value: string) => {
    try {
      JSON.parse(value);
      this.validationErrorMessage.set('');
      return true;
    } catch (error: any) {
      this.validationErrorMessage.set(error.message);
      return false;
    }
  };

  translateText() {
    if (!this.validateContent(this.dictionary)) {
      return;
    }
    this.i18nProService
      .setLocalizedDictionary('en-us', this.dictionary)
      .subscribe(() => {
        this.translationExampleTextLine1 = this.i18nProService.t(
          this.translationExampleTextLine1
        );
        this.translationExampleTextLine2 = this.i18nProService.t(
          this.translationExampleTextLine2,
          { name: 'Joe' }
        );
        this.translationExampleTextLine3 = this.i18nProService.t(
          this.translationExampleTextLine3,
          2,
          { count: 2 }
        );
      });
  }

  resetText() {
    this.i18nProService
      .setLocalizedDictionary('q', { test: 'sadf' })
      .subscribe(() => {
        this.dictionary = this.initialDictionary;
        this.translationExampleTextLine1 = 'hello';
        this.translationExampleTextLine2 = 'my_name';
        this.translationExampleTextLine3 = 'question_apple';
      });
  }
}
