import { Component, signal } from '@angular/core';
import { CodeEditorComponent } from "../../shared/components/code-editor/code-editor.component";

@Component({
  selector: 'msh-basic',
  imports: [CodeEditorComponent],
  template: `
    <article class="px-6 xl::px-4 pt-16 lg:max-w-6xl lg:mx-auto">
      <h1 class="title mb-2">Basic Usage</h1>
      <p class="subtitle">
        The basic usage of the library is to use the <code>t</code> method in
        your components.
      </p>

      <msh-code-editor
        [validatorFunction]="validateContent"
        [(content)]="dictionary"
        fileName="en-us.json"
        [errorMessage]="validationErrorMessage()"
      ></msh-code-editor>
      {{ dictionary }}
    </article>
  `,
  styles: ``,
})
export class BasicComponent {
  dictionary = `{}`;
  validationErrorMessage = signal('')

  validateContent = (value: string) => {
    try {
      JSON.parse(value);
      this.validationErrorMessage.set('');
      return true;
    } catch (error: any) {
      this.validationErrorMessage.set(error.message);
      return false;
    }
  }
}
