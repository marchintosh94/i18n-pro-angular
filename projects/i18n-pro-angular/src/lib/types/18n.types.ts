export interface LocalizedDictionary {
  [key: string]: string | number;
}
export interface I18nDictionary {
  [key: string]: LocalizedDictionary;
}
export interface DynamicData {
  [key: string]: string | number;
}

export type Plural = 1 | 2 | 3 | undefined;

type TFullArgs = [Plural, DynamicData];
type TOnlyDynamicArgs = [DynamicData];
type TOnlyPluralArgs = [Plural];
export type TranslationArguments =
  | TFullArgs
  | TOnlyDynamicArgs
  | TOnlyPluralArgs
  | [];

export type ChangeLanguageOptions = { apiUrl: string; } | { localizedDictionary: LocalizedDictionary | string;};
