import UsersSagas from "./users";
import { all } from "redux-saga/effects";

//to fork all saga into parallel
export default function* rootSaga() {
    yield all([...UsersSagas]);
}
