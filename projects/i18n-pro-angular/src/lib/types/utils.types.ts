
export type TranslationTransormationFunction = (translation: string) => string;
export type CombineTranslationTransformations = (
  ...functions: TranslationTransormationFunction[]
) => string;
