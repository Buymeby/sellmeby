import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { AuthTypes } from '../Redux/AuthRedux'
import { VendorTypes } from '../Redux/VendorRedux'
import { ItemTypes } from '../Redux/ItemRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { register, login, verifyToken } from './AuthSagas'
import { uploadLogo, updateVendor, updateHours } from './VendorSagas'
import { createItem } from './ItemSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    takeLatest(AuthTypes.LOGIN_REQUEST, login, api),
    takeLatest(AuthTypes.TOKEN_REQUEST, verifyToken, api),
    takeLatest(AuthTypes.REGISTRATION_REQUEST, register, api),

    takeLatest(VendorTypes.LOGO_REQUEST, uploadLogo, api),
    takeLatest(VendorTypes.UPDATE, updateVendor, api),
    takeLatest(VendorTypes.UPDATE_HOURS, updateHours, api),

    takeLatest(ItemTypes.CREATE_REQUEST, createItem, api)
  ])
}
