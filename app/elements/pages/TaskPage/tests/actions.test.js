import { defaultAction } from 'elements/pages/TaskPage/actions';
import { DEFAULT_ACTION } from 'elements/pages/TaskPage/constants';

describe('TaskPage actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });
});
