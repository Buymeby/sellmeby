import { call, put } from 'redux-saga/effects'
import VendorActions from '../Redux/VendorRedux'
import { NavigationActions } from 'react-navigation'

export function * uploadLogo (api, action) {
  const { logo } = action
  const form = new FormData()

  form.append('logo', logo)
  const headers = {
    'Content-Type': 'multipart/form-data'
  }
  const response = yield call(api.uploadLogo, form, headers)

  console.tron.log(response)
}

export function * updateVendor (api, action) {
  const { params } = action
  const { nextRoute } = action

  const response = yield call(api.updateVendor, params)

  if(response.ok) {
    yield put(VendorActions.updateSuccess(response.data))
    yield put(NavigationActions.navigate({ routeName: nextRoute}))
  }
}

export function * updateHours (api, action) {
  const { params } = action
  const { nextRoute } = action.params

  const response = yield call(api.updateHours, params)

  if(response.ok) {
    yield put(VendorActions.updateSuccess(response.data))
    yield put(NavigationActions.navigate({ routeName: nextRoute}))
  }
}
