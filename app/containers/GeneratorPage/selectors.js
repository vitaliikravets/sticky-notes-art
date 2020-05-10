import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGeneratorPage = state => state.GeneratorPage || initialState;

export const selectFile = () => {
  return createSelector(
    selectGeneratorPage,
    state => state.file,
  );
}

export const selectImageData = () => {
  return createSelector(
    selectGeneratorPage,
    state => state.data,
  );
}

export const selectCellSizeFactor = () => {
  return createSelector(
    selectGeneratorPage,
    state => state.cellSizeFactor,
  );
}
