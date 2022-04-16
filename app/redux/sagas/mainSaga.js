import { put, all, takeEvery, delay, select, takeLatest } from 'redux-saga/effects';
import { deleteCompareItem, getCompareItemInfo } from '../../utils/CommonFunctions';
import { onEndGame, onGenerateNumbers, onSetCheckedInfo } from '../actions/mainAction';
import { PRESS_CARD_ITEM, RESTART_GAME, SET_CHECKED_INFO } from '../types/mainType';

function* endGameInfo(action) {
    const state = yield select();

    let correctCardNumbers = state.main.correctCardNumbers;
    if (correctCardNumbers.length === 6) {
        yield delay(300);
        yield put(onEndGame());
    }
}

function* restartGameInfo(action) {
    yield delay(200);
    yield put(onGenerateNumbers())
}

function* compareInfo(action) {

    // get unchecked list
    let compareItemInfo = getCompareItemInfo();

    // check
    let unCorrectArr = [];
    let keys = Object.keys(compareItemInfo);
    let correctCardNumbers = [];
    if (keys.length > 0) {
        keys.forEach(key => {
            if (compareItemInfo[key].length > 1) {

                // check 
                let firstItem = compareItemInfo[key][0];
                let secondItem = compareItemInfo[key][1];

                if (firstItem.number === secondItem.number) {
                    correctCardNumbers.push(firstItem.number);
                } else {
                    unCorrectArr = [...unCorrectArr, { ...firstItem }, { ...secondItem }];
                    deleteCompareItem(key);
                }
            }
        })
    }

    // console.log(unCorrectArr, correctCardNumbers);
    // console.log("unCorrectArr", unCorrectArr);

    if (unCorrectArr.length > 0 || correctCardNumbers.length > 0) {
        yield delay(1200);
        yield put(onSetCheckedInfo(unCorrectArr, correctCardNumbers));
    }
}

export function* watchEndGameInfo() {
    yield takeLatest(SET_CHECKED_INFO, endGameInfo)
}

export function* watchRestartGame() {
    yield takeLatest(RESTART_GAME, restartGameInfo)
}

export function* watchCompareInfo() {
    yield takeEvery(PRESS_CARD_ITEM, compareInfo)
}