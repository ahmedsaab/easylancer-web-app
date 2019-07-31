/*
 *
 * LanguageProvider actions
 *
 */

import { CHANGE_LOCALE } from 'elements/pages/LanguageProvider/constants';

export function changeLocale(languageLocale) {
  return {
    type: CHANGE_LOCALE,
    locale: languageLocale,
  };
}
