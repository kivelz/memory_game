import {
    RESTART_GAME, PRESS_CARD_ITEM,
    GENERATE_NUMBERS, SET_CHECKED_INFO, END_GAME
} from "../types/mainType";

export const onRestartGame = () => {
    return {
        type: RESTART_GAME
    }
}

export const onGenerateNumbers = () => {
    return {
        type: GENERATE_NUMBERS
    }
}

export const onPressCardItem = (row, col) => {
    return {
        type: PRESS_CARD_ITEM,
        payload: {
            row, col
        }
    }
}

export const onSetCheckedInfo = (unCorrectArr, correctCardNumbers) => {
    return {
        type: SET_CHECKED_INFO,
        payload: {
            unCorrectArr,
            correctCardNumbers
        }
    }
}

export const onEndGame = () => {
    return {
        type: END_GAME,
    }
}