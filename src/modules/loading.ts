/*
  2023.06.20
  - 기존의 리덕스 액션을 typesafe-actions로 변경
  - 리듀서는 createReducer와 handleReducer로 작성
*/

import { ActionType, createAction, createReducer } from "typesafe-actions";

// 액션
const START_LOADING = "loading/START_LOADING" as const;
const FINISH_LOADING = "loading/FINISH_LOADING" as const;

// 액션 생성 함수
export const startLoading = createAction(
  START_LOADING,
  (requestType) => requestType,
)();

export const finishLoading = createAction(
  FINISH_LOADING,
  (requestType) => requestType,
)();

// 액션 객체에 대한 타입
// 액션 객체 타입은 액션 생성함수를 참조해서 유추가 가능하기 때문에 제너릭을 생략해도 무방.
const actions = { startLoading, finishLoading }; // 모든 액션 생성함수들을 actions 객체에 넣음
type TLoadingAction = ActionType<typeof actions>; // ActionType을 사용하여 모든 액션 객체 타입 준비

// 관리할 상태의 타입
type TLoadingState = {
  loading: boolean;
};

// 초기 상태
const initialState: TLoadingState = {
  loading: false,
};

// 리듀서
const loading = createReducer<TLoadingState, TLoadingAction>(initialState)
  .handleAction(startLoading, (state, action) => ({
    ...state,
    [action.payload]: true,
  }))
  .handleAction(finishLoading, (state, action) => ({
    ...state,
    [action.payload]: false,
  }));

export default loading;
