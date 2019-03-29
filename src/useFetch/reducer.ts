interface Action {
  type: string;
  [key: string]: any;
}

interface State<T> {
  fetching: boolean;
  response: T;
  error: any;
}

export const actionTypes = {
  fetching: 'FETCHING',
  receiveResponse: 'RECEIVE_RESPONSE',
  error: 'ERROR'
};

export default function fetchReducer<T>(state: State<T>, action: Action) {
  switch (action.type) {
    case actionTypes.fetching:
      return {
        ...state,
        fetching: true
      };
    case actionTypes.receiveResponse:
      return {
        ...state,
        fetching: false,
        response: action.response
      };
    case actionTypes.error:
      return {
        ...state,
        fetching: false,
        error: action.error
      };
    default:
      return state;
  }
}
