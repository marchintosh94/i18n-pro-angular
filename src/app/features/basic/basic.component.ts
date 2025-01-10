import { Component, inject, signal } from '@angular/core';
import { CodeEditorComponent } from '../../shared/components/code-editor/code-editor.component';
import { I18nProService } from 'i18n-pro-angular';
import { TranslateSectionComponent } from "./translate-section/translate-section.component";

@Component({
  selector: 'msh-basic',
  imports: [CodeEditorComponent, TranslateSectionComponent],
  template: `
    <article class="px-6 xl::px-4 pt-16 lg:max-w-6xl lg:mx-auto">
      <h1 class="title mb-2">Basic Usage</h1>
      <p class="subtitle">
        Here is a basic example of how to use the core functionalities of the
        library.
      </p>

      <section class="mt-8">
        <h2 class="subtitle">Dictionary</h2>
        <p class="text-base/6">
          The dictionary is the core of the library. It is a JSON object that
          contains all the translations for the application. The library will
          use this object to translate the strings. The dictionary can be stored
          in a file or in a variable. In this example, we are storing it in a
          variable.
        </p>
        <div class="space-y-2 mt-2">
          <p class="section-title">Placeholder</p>
          <p class="text-base/6">
            The dictionary can contain placeholders that will be replaced by the
            library. The placeholders are defined using curly braces. For
            example,
            <code>{{ '{' }}name{{ '}' }}</code> is a placeholder.
          </p>
          <p class="section-title">Pluralization</p>
          <p class="text-base/6">
            The dictionary can also contain multiple translations for the same
            key. The library will select the translation based on the context.
            For example, the key <code>question_apple</code> has two
            translations.
          </p>
        </div>
        <div class="mt-4 max-w-[90%] mx-auto">
          <msh-code-editor
            [(content)]="initialDictionary"
            [disabled]="true"
            fileName="en-us.json"
          />
        </div>
      </section>
      <section class="mt-8">
        <h2 class="subtitle">Load Dictionary</h2>
        <p class="text-base/6">
          In order to translate the content in your application, the first thing to do is to load the dictionary in the app.
          To do this operation there are two different solutions available in <code>I18nPro</code>.
        </p>
      </section>
      <msh-translate-section />
    </article>
  `,
  styles: ``,
})
export class BasicComponent {
  initialDictionary = `{
    "hello": "Hello, World!",
    "my_name": "My name is {name}.",
    "question_apple": "Dou you want an apple? | Do you want {count} apples?"
}`;
}
