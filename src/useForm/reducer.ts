type Data = { [key: string]: string };

interface Action {
  type: string;
  [key: string]: string;
}

interface State<T> {
  submitting: boolean;
  response: T;
  error: unknown;
  formFields: Data;
}

const actionTypes = {
  submitting: 'FORM_SUBMITTING',
  formSubmitted: 'FORM_SUBMITTED',
  setFormFields: 'SET_FORM_FIELDS',
  formError: 'FORM_ERROR'
};

export default function useFormReducer<T>(state: State<T>, action: Action) {
  switch (action.type) {
    case actionTypes.submitting:
      return {
        ...state,
        submitting: true
      };
    case actionTypes.formSubmitted:
      return {
        ...state,
        submitting: false,
        response: action.response
      };
    case actionTypes.formError:
      return {
        ...state,
        submitting: false,
        response: null,
        error: action.error
      };
    case actionTypes.setFormFields:
      return {
        ...state,
        formFields: action.formFields
      };
    default:
      return state;
  }
}
