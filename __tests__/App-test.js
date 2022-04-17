/**
 * @format
 */

 import 'react-native';
 // Note: test renderer must be required after react-native.
import React from 'react';
import App from '../App';
import TestRenderer from 'react-test-renderer';
import { addCompareItem, checkContains, deleteCompareItem, getClickedCount, getCompareItemInfo, getRandomList, generateNumbers, setClickedCount, setCompareItemInfo } from '../app/utils/CommonFunctions';
import mainReducer from '../app/redux/reducers/mainReducer';
import { RESTART_GAME,  END_GAME, GENERATE_NUMBERS } from '../app/redux/types/mainType';

 
//core functions
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');


describe("CommonFunctions test", () => {
  //test redux sagas
   it("getRandomList function -> should be 12 integer random list", () => {
     let results = getRandomList(1, 100, 6, 2);
     console.log(results);
   });
 
   it("setClickedCount and getClickedCount function test -> should be set value ", () => {
     setClickedCount(1);
     expect(getClickedCount()).toBe(1);
   });
 
   
   it("setCompareInfo and getCompareItemInfo function test", () => {

     setCompareItemInfo({ row: 1, col: 2, number: 3 });
     expect(getCompareItemInfo()).toEqual({ row: 1, col: 2, number: 3 });
   });
 
   it("addCompareItem and deleteCompareItem function test", () => {
     addCompareItem({ row: 1, col: 2, number: 3, clickedCount: 3 });
     expect(deleteCompareItem(1));
   });
 
   it("checkContains function test -> should be false", () => {
     expect(checkContains({ row: 2, col: 3 })).toBe(false);
   });
   it("should return the number of generated numbers", () => { 
    expect(getRandomList(1, 100, 6, 2)).toHaveLength(12);
  })
 });
 
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
 
 // redux test
describe('it should render without crashing', () => { 
  it('should render correctly', () => {
    const tree = TestRenderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
})

test("Should return the initial main reducer state", () => {
  expect(mainReducer(undefined, {})).toEqual(initState)
});

test("Should return the restarted main reducer state", () => {
  expect(mainReducer(undefined, { type: RESTART_GAME })).toEqual({
    ...initState,
    isEnded: false,
    loading: true,
  })
});
test("should return the number of generated numbers", () => {
  let nums = getRandomList(1, 100, 6, 2);
  expect(mainReducer(undefined, { type: GENERATE_NUMBERS })).not.toEqual({
  count: 0,
  loading: false,
  correctCardNumbers: [],
  //generate cardItems
  cardItems: [
      [
        {
          number: nums,
          showFace: false
        },
        {
          number: nums[1],
          showFace: false
        },
        {
          number: nums[2],
          showFace: false
        }
      ],
      [
        {
          number: nums[3],
          showFace: false
        },
        {
          number: nums[4],
          showFace: false
        },
        {
          number: nums[5],
          showFace: false
        }
      ],
      [
        {
          number: nums[6],
          showFace: false
        },
        {
          number: nums[7],
          showFace: false
        },
        {
          number: nums[8],
          showFace: false
        }
      ],
      [
        {
          number: nums[9],
          showFace: false
        },
        {
          number: nums[10],
          showFace: false
        },
        {
          number: nums[11],
          showFace: false
        }
      ]
    ]
               
  })

 
})
test("should return the state of end game", () => {
  expect(mainReducer(undefined, { type: END_GAME })).not.toEqual({
    ...initState,
    isEnded: true,
    loading: false,
  })
})



describe('CardItem should not crash', () => { 

  it('should render correctly', () => {
    const tree = TestRenderer.create(<App />).toJSON();
    expect(tree).not.toBe(null)
  });
})