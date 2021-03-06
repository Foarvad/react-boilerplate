import axios from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';

import API from 'Api';

import * as ConfigActions from 'js/actions/ConfigActions';
// import * as FilterActions from 'js/actions/FilterActions';

export class AppSaga {
  static* getConfig() {
    try {
      const response = yield call(axios, {
        method: 'GET',
        url: API.config(),
      });
      // Setting default value for required filter (periodicity)
      // yield put(FilterActions.setPeriodicityFilter(response.data.filters.periodicities[0].id));

      yield put(ConfigActions.getConfigSuccess(response.data));
    } catch (e) {
      yield put(ConfigActions.getConfigFail());
    }
  }
}

export function* saga() {
  yield takeLatest(ConfigActions.getConfigRequest, AppSaga.getConfig);
}
