import { changeLocale } from 'elements/pages/LanguageProvider/actions';

import { CHANGE_LOCALE } from 'elements/pages/LanguageProvider/constants';

describe('LanguageProvider actions', () => {
  describe('Change Local Action', () => {
    it('has a type of CHANGE_LOCALE', () => {
      const expected = {
        type: CHANGE_LOCALE,
        locale: 'de',
      };
      expect(changeLocale('de')).toEqual(expected);
    });
  });
});
