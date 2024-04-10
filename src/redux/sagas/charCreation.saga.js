import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createChar(action) {
  try {

    yield axios.post('/api/characters', action.payload);


  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* charCreationSaga() {
  yield takeLatest('CREATE_CHAR', createChar);
}

export default charCreationSaga;