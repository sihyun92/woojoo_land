// 액션
const START_LOADING = "loading/START_LOADING" as const;
const FINISH_LOADING = "loading/FINISH_LOADING" as const;

// 액션 생성 함수
export const startLoading = () => ({
  type: START_LOADING,
});

export const finishLoading = () => ({
  type: FINISH_LOADING,
});

// 액션 객체에 대한 타입
type TLoadingAction =
  | ReturnType<typeof startLoading>
  | ReturnType<typeof finishLoading>;

// 관리할 상태의 타입
type TLoadingState = {
  startLoading: boolean;
  finishLoading: boolean;
};

// 초기 상태
const initialState: TLoadingState = {
  startLoading: false,
  finishLoading: true,
};

// 리듀서
function loading(
  state: TLoadingState = initialState,
  action: TLoadingAction,
): TLoadingState {
  switch (action.type) {
    case START_LOADING:
      return { startLoading: true, finishLoading: false };
    case FINISH_LOADING:
      return { startLoading: false, finishLoading: true };
    default:
      return state;
  }
}

export default loading;
