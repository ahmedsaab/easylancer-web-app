import { defaultAction } from 'elements/pages/OfferDetailsModal/actions';
import { DEFAULT_ACTION } from 'elements/pages/OfferDetailsModal/constants';

describe('OfferDetailsModal actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });
});
