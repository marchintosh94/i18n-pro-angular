import { inject, Injectable } from '@angular/core';
import { I18Message, I18Messages, TranslationArguments } from '../types/18n.types';
import {
  BehaviorSubject,
  catchError,
  Observable,
  Subscriber,
  tap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { checkMessageObjectFormat, combineTranslationTransformations, getDynamicDataFromArgs, getPluralFromArgs, getTranslationFromDictionary, getTranslationPlural, getTranslationWithDynamicData } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class I18nProService {
  private _messages: I18Messages = {};
  private _defaultLocale = '';
  private _storedLocales: string[] = [];
  private http: HttpClient = inject(HttpClient);

  public locale$ = new BehaviorSubject<string>('');
  public isLoadingLanguage$ = new BehaviorSubject<boolean>(false);

  private _setLocale = (locale: string) => {
    this.locale$.next(locale);
  };

  private _setLocaleMessages = (locale: string, messages: I18Message) => {
    this._storedLocales = [...new Set([...this._storedLocales, locale])];
    this._messages = { ...this._messages, [locale]: messages };
  };

  private _subscriberSucceedActions = (
    subscriber: Subscriber<string>,
    locale: string
  ) => {
    subscriber.next(locale);
    subscriber.complete();
  };

  private _getRemoteLocaleMessages = (
    apiUrl: string
  ): Observable<I18Message> => {
    this.isLoadingLanguage$.next(true);
    return this.http.get<I18Message>(`${apiUrl}`).pipe(
      tap((response) => {
        const error = checkMessageObjectFormat(response);
        if (error) {
          throw new Error(error);
        }
        this.isLoadingLanguage$.next(false)
      }),
      catchError((error) => {
        this.isLoadingLanguage$.next(false);
        throw error;
      })
    );
  };

  loadLocaleMessages = (locale: string, apiUrl: string): Observable<string> => {
    return new Observable((subscriber) => {
      if (this.isLoadingLanguage$.value) {
        return subscriber.next(undefined);
      }
      if (this.locale$.value === locale) {
        this._subscriberSucceedActions(subscriber, locale);
        return;
      }
      if (this._storedLocales.includes(locale)) {
        this._setLocale(locale);
        this._subscriberSucceedActions(subscriber, locale);
        return;
      }
      this._getRemoteLocaleMessages(`${apiUrl}`).subscribe({
        next: (response) => {
          this._setLocaleMessages(locale, response);
          this._setLocale(locale);
          this._subscriberSucceedActions(subscriber, locale);
        },
        error: (err) => {
          subscriber.error(err);
        }
      });
    });
  };

  t(value: string, ...args: TranslationArguments): string {
    const flatArgs = args.flat();
    const plural = getPluralFromArgs(flatArgs);
    const dynamicData = getDynamicDataFromArgs(flatArgs);

    const locale = this.locale$.value || this._defaultLocale;
    const translationKey =
      this._messages[locale] &&
      this._messages[locale][value]
        ? value
        : undefined;

    const translation = combineTranslationTransformations(value)(
      getTranslationFromDictionary(this._messages, translationKey, locale),
      getTranslationPlural(translationKey, plural, value),
      getTranslationWithDynamicData(dynamicData),
      (translation) => translation.trim()
    );

    return translation;
  }
}
