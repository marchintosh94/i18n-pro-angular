import { getPluralFromArgs, getDynamicDataFromArgs, checkMessageObjectFormat } from './utils';
import { I18Message } from '../types/18n.types';

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

  describe('checkMessageObjectFormat', () => {
    it('should return an error message if the message object has no keys', () => {
      const message: I18Message = {};
      expect(checkMessageObjectFormat(message)).toBe('No keys found. Please check the JSON and return at least 1 translation');
    });

    it('should return an error message if the message object is an array', () => {
      const message: I18Message = [{key: 'value'}] as any;
      expect(checkMessageObjectFormat(message)).toBe('Invalid format for dictionary. It must be like a Record<string, string>');
    });

    it('should return an error message if the message object contains non-string or non-number values', () => {
      const message: I18Message = { key: {} as any };
      expect(checkMessageObjectFormat(message)).toBe('Invalid format for dictionary. It must be like a Record<string, string>');
    });

    it('should return an empty string if the message object is valid', () => {
      const message: I18Message = { key: 'value' };
      expect(checkMessageObjectFormat(message)).toBe('');
    });
  });
});
