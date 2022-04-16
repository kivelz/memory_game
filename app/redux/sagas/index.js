import { all } from "redux-saga/effects";
import { watchCompareInfo, watchRestartGame, watchEndGameInfo } from "./mainSaga";

export default function* rootSaga() {
    yield all([
        watchEndGameInfo(),
        watchRestartGame(),
        watchCompareInfo()
    ])
};