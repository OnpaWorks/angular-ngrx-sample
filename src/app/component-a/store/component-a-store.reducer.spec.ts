import { componentAStoreReducer, initialState } from './component-a-store.reducer';

describe('List Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = componentAStoreReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
