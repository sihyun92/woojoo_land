const SAMPLE_ACTION = "reducers/SAMPLE_ACTION";

export const sampleAction = () => ({
  type: SAMPLE_ACTION,
});

type SampleAction = ReturnType<typeof sampleAction>;

type SampleState = {
  test: boolean;
};

const initialState: SampleState = {
  test: true,
};

function sample(
  state: SampleState = initialState,
  action: SampleAction,
): SampleState {
  switch (action.type) {
    case SAMPLE_ACTION:
      return {
        ...state,
        test: false,
      };
    default:
      return state;
  }
}

export default sample;
