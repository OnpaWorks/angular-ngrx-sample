import { componentBStoreReducer, initialState } from './component-b-store.reducer';

describe('List Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = componentBStoreReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
