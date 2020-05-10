import { IMAGE_SELECTED, IMAGE_DATA_READ, CELL_SIZE_FACTOR_CHANGED } from './constants';

export function imageSelected(event) {
  const files = [ ...event.target.files ];
  return {
    type: IMAGE_SELECTED,
    file: files[0],
  };
}

export function imageDataRead(data){
  return {
    type: IMAGE_DATA_READ,
    data: data,
  };
}

export function changeCellSizeFactor(event){
  return {
    type: CELL_SIZE_FACTOR_CHANGED,
    value: event.target.value,
  }
}
