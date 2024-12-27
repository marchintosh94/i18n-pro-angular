import { DynamicData, I18Message, Plural } from '../types/18n.types';

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
 * @param {I18Message} message
 * @returns {string} error message
 */
export const checkMessageObjectFormat = (message: I18Message): string => {
  const messageKeys = Object.keys(message);
  if (messageKeys.length === 0) {
    return 'No keys found. Please check the JSON and return at least 1 translation';
  }

  if (
    Array.isArray(message) ||
    Object.entries(message).find(
      ([_, val]) => typeof val !== 'string' && typeof val !== 'number'
    )
  ) {
    return 'Invalid format for dictionary. It must be like a Record<string, string>';
  }
  return '';
};
