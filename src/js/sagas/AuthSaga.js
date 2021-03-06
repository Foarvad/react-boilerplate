import axios from 'axios';
import { takeEvery, call, put, all, delay } from 'redux-saga/effects';

import API from 'Api';

import AuthService from 'js/services/AuthService';

import * as AuthActions from 'js/actions/AuthActions';
import * as UserActions from 'js/actions/UserActions';
import * as NotificationActions from 'js/actions/NotificationActions';
import * as UIActions from 'js/actions/UIActions';


export class AuthSaga {
  static* login(action) {
    try {
      const response = yield call(axios, {
        method: 'POST',
        url: API.login(),
        data: {
          username: action.payload.username,
          password: action.payload.password,
        },
      });
      AuthService.setJWT(response.data.token);

      yield all([
        put(AuthActions.setAuthStatus()),
        put(AuthActions.loginSuccess()),
        put(UserActions.getUserRequest()),
        put(UIActions.hideDropdown()),
        put(UIActions.showDropdown()),
      ]);
    } catch (e) {
      yield put(AuthActions.loginFail());

      yield delay(300);
      yield put(
        NotificationActions.setNotification({
          module: 'login',
          type: 'error',
          message: 'Can\'t login with provided credentials',
        }),
      );
    }
  }

  static* logout() {
    try {
      yield call(axios, {
        method: 'POST',
        url: API.logout(),
      });
      AuthService.unsetJWT();

      yield all([
        put(AuthActions.unsetAuthStatus()),
        put(AuthActions.logoutSuccess()),
        put(UIActions.hideDropdown()),
        put(UIActions.showDropdown()),
      ]);
    } catch (e) {
      yield put(AuthActions.logoutFail());
    }
  }
}

export function* saga() {
  yield takeEvery(AuthActions.loginRequest, AuthSaga.login);
  yield takeEvery(AuthActions.logoutRequest, AuthSaga.logout);
}
