import { defaultAction } from 'elements/organisms/TaskActionButtons/actions';
import { DEFAULT_ACTION } from 'elements/organisms/TaskActionButtons/constants';

describe('TaskActionButtons actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });
});
