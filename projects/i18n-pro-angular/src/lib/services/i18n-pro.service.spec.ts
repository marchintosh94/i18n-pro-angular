import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { I18nProService } from './i18n-pro.service';
import { LocalizedDictionary } from '../types/18n.types';
import { provideHttpClient } from '@angular/common/http';

describe('I18nProService', () => {
  let service: I18nProService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(I18nProService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set locale', () => {
    const locale = 'en';
    let count = 0;
    service['locale$'].subscribe((value) => {
      count > 0 && expect(value).toBe(locale);
      count++;
    });
    service['_setLocale'](locale);
  });

  describe('loadLocalizedDictionary', () => {
    it('should load locale dictionary from API', () => {
      const locale = 'en';
      const apiUrl = 'http://example.com';
      const mockLocalDictionary: LocalizedDictionary = { hello: 'Hello' };

      service.loadLocalizedDictionary(locale, apiUrl).subscribe((loadedLocale) => {
        expect(loadedLocale).toBe(locale);
        expect(service['locale$'].value).toBe(locale);
        expect(service['isLoadingLanguage$'].value).toBe(false);
        expect(service['_dictionary']).toEqual({
          [locale]: mockLocalDictionary,
        });
      });

      const req = httpMock.expectOne(`${apiUrl}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockLocalDictionary);
    });

    it('should throw an error if the response is not a valid translation dictionary', () => {
      const locale = 'en';
      const apiUrl = 'http://example.com/error';
      const mockLocalDictionary: LocalizedDictionary = [{ hello: 'Hello' }] as any;

      service.loadLocalizedDictionary(locale, apiUrl).subscribe({
        error: (error) => {
          expect(error).toEqual(
            new Error(
              'Invalid format for dictionary. It must be like a Record<string, string>'
            )
          );
          expect(service['isLoadingLanguage$'].value).toBe(false);
        },
      });

      const req = httpMock.expectOne(`${apiUrl}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockLocalDictionary);
    });

    it('should throw an error if HTTP request fails', () => {
      const locale = 'en';
      const apiUrl = 'http://example.com/error';

      service.loadLocalizedDictionary(locale, apiUrl).subscribe({
        error: (error) => {
          console.log('ERROR', error);
          expect(error).toBeTruthy();
          expect(service['isLoadingLanguage$'].value).toBe(false);
        },
      });

      const req = httpMock.expectOne(`${apiUrl}`);
      expect(req.request.method).toBe('GET');
      req.flush('Failed', { status: 500, statusText: 'Internal server error' });
    });

    it('should not load locale dictionary if is already loading', () => {
      const locale = 'en';
      const apiUrl = 'http://example.com';
      service['isLoadingLanguage$'].next(true);

      service.loadLocalizedDictionary(locale, apiUrl).subscribe((loadedLocale) => {
        expect(loadedLocale).toBeUndefined();
      });

      httpMock.expectNone(`${apiUrl}`);
    });

    it('should not load locale dictionary if are already loaded', () => {
      const locale = 'en';
      const apiUrl = 'http://example.com';
      service['_storedLocales'] = [locale];

      service.loadLocalizedDictionary(locale, apiUrl).subscribe((loadedLocale) => {
        expect(loadedLocale).toBe(locale);
      });

      httpMock.expectNone(`${apiUrl}`);
    });

    it('should return locale if is already set', () => {
      const locale = 'en';
      const apiUrl = 'http://example.com';
      service.locale$.next(locale);

      service.loadLocalizedDictionary(locale, apiUrl).subscribe((loadedLocale) => {
        expect(loadedLocale).toBe(locale);
      });

      httpMock.expectNone(`${apiUrl}`);
    });
  });

  describe('t function', () => {
    it('should translate a message', () => {
      const locale = 'en';
      const localizedDictionary: LocalizedDictionary = { hello: 'Hello' };
      service['locale$'].next(locale);
      service['_dictionary'] = { [locale]: localizedDictionary };

      const translation = service.t('hello');
      expect(translation).toBe('Hello');
    });

    it('should handle pluralization', () => {
      const locale = 'en';
      const localizedDictionary: LocalizedDictionary = { item: 'One item|{count} items' };
      service['locale$'].next(locale);
      service['_dictionary'] = { [locale]: localizedDictionary };

      const translation = service.t('item', 2, { count: 2 });
      expect(translation).toBe('2 items');
    });

    it('should handle dynamic data', () => {
      const locale = 'en';
      const localizedDictionary: LocalizedDictionary = {
        greeting: 'Hello, {name}!',
      };
      service['locale$'].next(locale);
      service['_dictionary'] = { [locale]: localizedDictionary };

      const translation = service.t('greeting', { name: 'John' });
      expect(translation).toBe('Hello, John!');
    });

    it('should return the key if the translation is not found', () => {
      const locale = 'en';
      service['locale$'].next(locale);
      service['_dictionary'] = { [locale]: {} };

      const translation = service.t('not-found');
      expect(translation).toBe('not-found');
    });

    it('should use the default locale if the current locale is not set', () => {
      const locale = 'en';
      const localizedDictionary: LocalizedDictionary = { hello: 'Hello' };
      service.locale$.next('');
      service['_defaultLocale'] = locale;
      service['_dictionary'] = { [locale]: localizedDictionary };

      const translation = service.t('hello');
      expect(translation).toBe('Hello');
    });

    it('should return the value if the plural argoument is not found', () => {
      const locale = 'en';
      const localizedDictionary: LocalizedDictionary = {
        item: 'One item|{count} items',
      };
      service['locale$'].next(locale);
      service['_dictionary'] = { [locale]: localizedDictionary };

      const translation = service.t('item', 3);
      expect(translation).toBe('item');
    })

    it('should replace the dynamic data with the key of the object if no related value is found', () => {
      const locale = 'en';
      const localizedDictionary: LocalizedDictionary = {
        greeting: 'Hello, {name}!',
      };
      service['locale$'].next(locale);
      service['_dictionary'] = { [locale]: localizedDictionary };

      const translation = service.t('greeting', { name: '' });
      expect(translation).toBe('Hello, name!');
    });
  });
});
