import {
  Dispatch,
  ReactNode,
  useReducer,
  createContext,
} from 'react';

export enum CatAction {
  FetchCatDetails = 'FETCH_CAT_DETAILS',
  FetchCatsByBreed = 'FETCH_CATS_BY_BREED',
  SelectedCat = 'SELECTED_CAT'
}

export interface IState {
  data: any
}

export interface IAction {
  type: CatAction;
  payload: any;
}

const initialState = {data: { breeds: [], cats: {}, selectedCat: [] }};

const CatContext = createContext<{state: IState; dispatch: Dispatch<IAction>;}>({
  state: initialState,
  dispatch: () => null,
});

function CatProvider({ children }: { children: ReactNode }): JSX.Element {
  const [state, dispatch] = useReducer(CatReducer, initialState);
  return (
    <CatContext.Provider value={{state, dispatch}}>{children}</CatContext.Provider>
  );
}

function CatReducer(state: IState, action: IAction) {
  switch (action.type) {
    case CatAction.FetchCatDetails:
      return {
        ...state,
        data: {
          ...state.data,
          cats: action.payload
        },
      };

    case CatAction.FetchCatsByBreed:
      return {
        ...state,
        data: {
          ...state.data,
          breeds: action.payload
        },
      };

    case CatAction.SelectedCat:
      return {
        ...state,
        data: {
          ...state.data,
          selectedCat: action.payload
        },
      };

    default: {
      throw new Error(`Unhandled action type:`);
    }
  }
}

export { CatContext, CatProvider, CatReducer };
