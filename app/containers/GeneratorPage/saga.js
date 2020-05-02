/**
 * Generator page sagas
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { IMAGE_SELECTED, IMAGE_DATA_READ } from './constants';
import * as actions from './actions';
import { selectFile, selectImageData } from './selectors';

function* imageSelected() {
  const file = yield select(selectFile());
  const data = yield call(readImage, file);
  yield put(actions.imageDataRead(data));
}

function readImage(file) {
  return new Promise(resolve => {
    const fileReader  = new FileReader();
    fileReader.onload = () => {
      resolve(fileReader.result);
    }
    fileReader.onerror = () => reject('FileReader could not load the file.');
    fileReader.readAsDataURL(file);
  });
}

// export function* imageDataRead() {
//   const imageData = yield select(selectImageData());
//   const image = yield call(loadImage, imageData);
//   console.log(image);
// }
//
// function loadImage(imageData){
//   return new Promise(resolve => {
//     const image = new Image();
//     image.style.display = 'none';
//     image.onload = () => {
//       resolve(image);
//     }
//     image.onerror = () => reject('Image could not load data.');
//     image.src = imageData;
//   });
// }

/**
 * Root saga manages watcher lifecycle
 */
export default function* saga() {
  yield takeLatest(IMAGE_SELECTED, imageSelected);
  //yield takeLatest(IMAGE_DATA_READ, imageDataRead);
}
