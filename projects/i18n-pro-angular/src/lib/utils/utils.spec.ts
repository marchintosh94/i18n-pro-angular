import { getPluralFromArgs, getDynamicDataFromArgs, checkDictionaryObjectFormat } from './utils';
import { LocalizedDictionary } from '../types/18n.types';

describe('Utils', () => {
  describe('getPluralFromArgs', () => {
    it('should return the plural value if the first argument is a number between 1 and 3', () => {
      expect(getPluralFromArgs([1])).toBe(1);
      expect(getPluralFromArgs([2])).toBe(2);
      expect(getPluralFromArgs([3])).toBe(3);
    });

    it('should return undefined if the first argument is not a number between 1 and 3', () => {
      expect(getPluralFromArgs([0])).toBeUndefined();
      expect(getPluralFromArgs([4])).toBeUndefined();
      expect(getPluralFromArgs(['string'])).toBeUndefined();
    });
  });

  describe('getDynamicDataFromArgs', () => {
    it('should return the first argument if it is an object', () => {
      const obj = { key: 'value' };
      expect(getDynamicDataFromArgs([obj])).toBe(obj);
    });

    it('should return the second argument if the first is not an object but the second is', () => {
      const obj = { key: 'value' };
      expect(getDynamicDataFromArgs(['string', obj])).toBe(obj);
    });

    it('should return undefined if neither argument is an object', () => {
      expect(getDynamicDataFromArgs(['string', 123])).toBeUndefined();
    });
  });

  describe('checkDictionaryObjectFormat', () => {
    it('should return an error message if the localizedDictionary object has no keys', () => {
      const localizedDictionary: LocalizedDictionary = {};
      expect(checkDictionaryObjectFormat(localizedDictionary)).toBe(
        'No keys found. Please check the JSON and return at least 1 translation'
      );
    });

    it('should return an error message if the localizedDictionary object is an array', () => {
      const localizedDictionary: LocalizedDictionary = [
        { key: 'value' },
      ] as any;
      expect(checkDictionaryObjectFormat(localizedDictionary)).toBe(
        'Invalid format for dictionary. It must be like a Record<string, string>'
      );
    });

    it('should return an error message if the localizedDictionary object contains non-string or non-number values', () => {
      const localizedDictionary: LocalizedDictionary = { key: {} as any };
      expect(checkDictionaryObjectFormat(localizedDictionary)).toBe(
        'Invalid format for dictionary. It must be like a Record<string, string>'
      );
    });

    it('should return an empty string if the localizedDictionary object is valid', () => {
      const localizedDictionary: LocalizedDictionary = { key: 'value' };
      expect(checkDictionaryObjectFormat(localizedDictionary)).toBe('');
    });
  });
});
