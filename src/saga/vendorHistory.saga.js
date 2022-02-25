import { getVendorHistorydetails } from "../services/VendorHistory/vendorHistoryService";
import { HistoryFailed, HistorySuccess } from "../store/actions/vendorHistoryActions";



export function* VendorHistoryAsync(action) {
    try {
      const history = yield getVendorHistorydetails(action.payload);
      yield put(HistorySuccess(history));
    } catch (error) {
      yield put(HistoryFailed(error.message));
    }
  }
  
  export function* VendorHistoryStart() {
    yield takeLatest(RegisterActionTypes.REGISTER_START, VendorHistoryAsync);
  }
  
  export function* VendorHistorySaga() {
    yield all([call(VendorHistoryStart)]);
  }