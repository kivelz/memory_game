/**
 * @format
 */

 import 'react-native';
 // Note: test renderer must be required after react-native.
 import React from 'react';
 
 import { addCompareItem, checkContains, deleteCompareItem, getClickedCount, getCompareItemInfo, getRandomList, setClickedCount, setCompareItemInfo } from '../app/utils/CommonFunctions';
 import mainReducer from '../app/redux/reducers/mainReducer';
 import { RESTART_GAME } from '../app/redux/types/mainType';
 
 describe("CommonFunctions test", () => {
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
 
 
 