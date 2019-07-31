import { defaultAction } from 'elements/pages/CreateOfferModal/actions';
import { DEFAULT_ACTION } from 'elements/pages/CreateOfferModal/constants';

describe('CreateOfferModal actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });
});
