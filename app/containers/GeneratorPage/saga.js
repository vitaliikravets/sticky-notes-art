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

/**
 * Root saga manages watcher lifecycle
 */
export default function* saga() {
  yield takeLatest(IMAGE_SELECTED, imageSelected);
  //yield takeLatest(IMAGE_DATA_READ, imageDataRead);
}
