import { SCREEN_WIDTH } from './Globals';

const defaultDeviceWidth = 430;

let gClickedCount = 0;

export const setClickedCount = (count) => {
    gClickedCount = count;
}

export const getClickedCount = () => {
    return gClickedCount;
}

let gCompareItemInfo = {};
export const getResponsiveSize = (val) => {

    let res = val;
    let diff = Math.abs(defaultDeviceWidth - SCREEN_WIDTH);

    // console.log("difference", diff)
    let sign = 1;
    if (SCREEN_WIDTH < defaultDeviceWidth) {
        sign = -1;
    }

    let fee = 0;

    if (diff > 300) {
        fee = 0.33;
    } else if (diff > 200 && diff <= 300) {
        fee = 0.25;
    } else if (diff > 100 && diff <= 200) {
        fee = 0.14;
    } else if (diff > 50 && diff <= 100) {
        fee = 0.06;
    }

    res = val * (1 + sign * fee);
    return res;
}


export const shuffle = (array) => {
    var tmp, current, top = array.length;
    if (top) {
        while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }
    }
    return array;
}

export const getRandomList = (min, max, listLength = 6, doubleCount = 2) => {
    let randomList = [];

    for (let i = 0; i < listLength; i++) {
        while (true) {
            let random = min + Math.floor(Math.random() * max);

            if (randomList.includes(random)) {
                continue
            }

            randomList.push(random);
            break;
        }
    }

    let list = [];
    for (let i = 0; i < doubleCount; i++) {
        list = [...list, ...randomList];
    }

    let res = shuffle(list);

    return res;
}

export const addCompareItem = ({ row, col, number, clickedCount }) => {
    gClickedCount = clickedCount + 1;
    let key = Math.floor(clickedCount / 2);
    if (!gCompareItemInfo[key]) {
        gCompareItemInfo[key] = [];
    }
    gCompareItemInfo[key].push({ row, col, number });
}

export const deleteCompareItem = (key) => {
    delete gCompareItemInfo[key];
}

export const setCompareItemInfo = (info) => {
    gCompareItemInfo = { ...info };
}

export const getCompareItemInfo = () => {
    return gCompareItemInfo;
}

export const checkContains = (row, col) => {
    let keys = Object.keys(gCompareItemInfo);
    for (let i = 0; i < keys.length; i++) {
        let items = gCompareItemInfo[i];

        if (items) {
            for (let j = 0; j < items.length; j++) {
                if (items[j].row === row && items[j].col === col) {
                    return true;
                }
            }
        }
    }

    return false;
}
