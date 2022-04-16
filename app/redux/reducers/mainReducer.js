import { getCompareItems, getRandomList, setClickedCount, setCompareItemInfo } from "../../utils/CommonFunctions";
import { END_GAME, GENERATE_NUMBERS, PRESS_CARD_ITEM, RESTART_GAME, SET_CHECKED_INFO } from "../types/mainType";

const initState = {
    count: 0,
    loading: false,
    correctCardNumbers: [],
    isEnded: false,
    cardItems: [
        [
            {
                number: 1,
                showFace: false
            },
            {
                number: 2,
                showFace: false
            },
            {
                number: 3,
                showFace: false
            }
        ],
        [
            {
                number: 4,
                showFace: false
            },
            {
                number: 5,
                showFace: false
            },
            {
                number: 6,
                showFace: false
            }
        ],

        [
            {
                number: 7,
                showFace: false
            },
            {
                number: 8,
                showFace: false
            },
            {
                number: 9,
                showFace: false
            }
        ],
        [
            {
                number: 10,
                showFace: false
            },
            {
                number: 11,
                showFace: false
            },
            {
                number: 12,
                showFace: false
            }
        ]
    ]
};

const mainReducer = (state = initState, action = {}) => {
    const payload = action.payload;

    switch (action.type) {
        case RESTART_GAME:

            let cdItems = state.cardItems;
            cdItems.forEach((subList, row) => {
                subList.forEach((item, col) => {
                    item.showFace = false
                })
            });


            return {
                ...state,
                isEnded: false,
                loading: true,
                cardItems: [...cdItems]
            }
        case GENERATE_NUMBERS:
            let randomList = getRandomList(1, 100, 6, 2);
            state.cardItems.forEach((subList, row) => {
                subList.forEach((item, col) => {
                    item.number = randomList[row * subList.length + col]
                })
            });
            setClickedCount(0);
            setCompareItemInfo({});

            return {
                ...state,
                count: 0,
                loading: false,
                correctCardNumbers: [],
                cardItems: [...state.cardItems]
            }
        case PRESS_CARD_ITEM:
            const { row, col } = payload;
            let item = state.cardItems[row][col];
            item.showFace = true;

            //
            return {
                ...state,
                count: state.count + 1,
                cardItems: [...state.cardItems]
            }
        case END_GAME:
            return {
                ...state,
                isEnded: true
            }
        case SET_CHECKED_INFO:
            let unCorrectArr = payload.unCorrectArr;
            let correctCardNumbers = payload.correctCardNumbers;

            let cardItems = state.cardItems;

            unCorrectArr.forEach(item => {
                cardItems[item.row][item.col].showFace = false;
            });

            payload.correctCardNumbers.forEach(number => {
                if (!correctCardNumbers.includes(number)) {
                    correctCardNumbers.push(number);
                }
            })

            return {
                ...state,
                cardItems: [...cardItems],
                correctCardNumbers: [...correctCardNumbers]
            }

        default:
            return state;
    }
}

export default mainReducer;
