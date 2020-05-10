import { IMAGE_SELECTED, IMAGE_DATA_READ, CELL_SIZE_FACTOR_CHANGED } from './constants';

export const initialState = {
  file: null,
  data: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
  cellSizeFactor: 10
}

const generatorReduce = (state = initialState, action) => {
  switch (action.type) {
    case IMAGE_SELECTED:
      return Object.assign({}, state, {
        file: action.file
      });
    case IMAGE_DATA_READ:
      return Object.assign({}, state, {
        data: action.data
      });
    case CELL_SIZE_FACTOR_CHANGED:
      return Object.assign({}, state, {
        cellSizeFactor: action.value
      });
    default:
      return state;
  }
}

export default generatorReduce;
