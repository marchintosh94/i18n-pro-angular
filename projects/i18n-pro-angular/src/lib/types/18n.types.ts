export interface I18Message {
  [key: string]: string;
}
export interface I18Messages {
  [key: string]: I18Message;
}
export interface DynamicData {
  [key: string]: string | number;
}

export type Plural = 1 | 2 | 3 | undefined;

type TFullArgs = [Plural, DynamicData];
type TOnlyDynamicArgs = [DynamicData];
type TOnlyPluralArgs = [Plural];
export type TranslationArguments = TFullArgs | TOnlyDynamicArgs | TOnlyPluralArgs | [];
