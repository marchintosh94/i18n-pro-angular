import {
  DynamicData,
  LocalizedDictionary,
  I18nDictionary,
  Plural,
} from '../types/18n.types';
import {
  CombineTranslationTransformations,
  TranslationTransormationFunction,
} from '../types/utils.types';

export const getPluralFromArgs = (args: any[]): Plural => {
  return typeof args[0] === 'number' && args[0] > 0 && args[0] < 4
    ? (args[0] as Plural)
    : undefined;
};

export const getDynamicDataFromArgs = (
  args: any[]
): DynamicData | undefined => {
  const resArg0 = typeof args[0] === 'object' ? args[0] : undefined;
  const resArg1 = typeof args[1] === 'object' ? args[1] : undefined;
  return resArg0 || resArg1;
};

/**
 * This method checks the consistency of translation dictionary of selected locale
 * If it returns a NON empty string, it means that there is an error
 * @param {LocalizedDictionary} localizedDictionary
 * @returns {string} error message
 */
export const checkDictionaryObjectFormat = (localizedDictionary: LocalizedDictionary): string => {
  const dictionaryKeys = Object.keys(localizedDictionary);
  if (dictionaryKeys.length === 0) {
    return 'No keys found. Please check the JSON and return at least 1 translation';
  }

  if (
    Array.isArray(localizedDictionary) ||
    Object.entries(localizedDictionary).find(
      ([_, val]) => typeof val !== 'string' && typeof val !== 'number'
    )
  ) {
    return 'Invalid format for dictionary. It must be like a Record<string, string>';
  }
  return '';
};

export const combineTranslationTransformations = (defaultValue: string): CombineTranslationTransformations =>
  (...functions: TranslationTransormationFunction[]) =>
    functions.reduce(
      (accumulator, currentCallback) => currentCallback(accumulator),
      defaultValue
    );

export const getTranslationFromDictionary =
  (dictionary: I18nDictionary, translationKey: string | undefined, locale: string) =>
  (value: string) =>
    translationKey ? `${dictionary[locale][translationKey]}` : value;

export const getTranslationPlural =
  (translationKey: string | undefined, plural: Plural, defaultValue: string) =>
  (translation: string) => {
    if (!translationKey || !plural) {
      return translation;
    }
    return translation.split('|')[plural - 1] || defaultValue;
  };

export const getTranslationWithDynamicData =
  (dynamicData: DynamicData | undefined) => (translation: string) => {
    if (!dynamicData) {
      return translation;
    }
    return Object.entries(dynamicData).reduce(
      (accumulator, [key]) =>
        accumulator.replace(
          `{${key}}`,
          dynamicData[key] ? `${dynamicData[key]}` : key
        ),
      translation
    );
  };

export const tryParseDictionary = (
  data: string | LocalizedDictionary
): LocalizedDictionary => {
  try {
    const dictionary =
      typeof data === 'string'
        ? (JSON.parse(data) as LocalizedDictionary)
        : data;
    return dictionary;
  } catch (err) {
    console.error('Error parsing dictionary', err);
    return {};
  }
};
