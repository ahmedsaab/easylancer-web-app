import { defaultAction } from 'elements/pages/Modal/actions';
import { DEFAULT_ACTION } from 'elements/pages/Modal/constants';

describe('Modal actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });
});
