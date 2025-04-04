'use client';
import { ReactNode, createContext, useReducer } from 'react';


type TInitialState = {
  contextMenu: {
    clientX: number;
    clientY: number;
    display: boolean;
  };
  keyPress: {
    key: string;
    code?: string;
    shiftKey: boolean;
  };

  event_Emitter: any;
  setEventEmitter: any;
};
const initialState: TInitialState = {
  contextMenu: {
    clientX: 0,
    clientY: 0,
    display: false,
  },
  keyPress: {
    key: '',
    shiftKey: false,
  },

  event_Emitter: {},
  setEventEmitter: () => {},
};
type TAction = {
  type: ETypes;
  payload: any;
};


enum ETypes {
  CLOSE_CONTEXT_MENU = 'CLOSE_CONTEXT_MENU',
  EVENT_EMITTER = 'EVENT_EMITTER',
  PODCAST_TITLE = 'PODCAST_TITLE',
}
// ======Types============
function reducer(state: any, action: TAction) {
  const { type, payload } = action;

  switch (type) {
    case ETypes.EVENT_EMITTER:
      return { ...state, event_Emitter: payload };
    case ETypes.PODCAST_TITLE:
      return { ...state, podcast: payload };
    default:
      return state;
  }
}
const ThemeSettings = createContext({
  ...initialState,
});

export const SettingsContext = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setEventEmitter = (payload: any) =>
    dispatch({
      type: ETypes.EVENT_EMITTER,
      payload,
    });

  // close context menu
  const closeContextMenu = () => {
    dispatch({
      type: ETypes.CLOSE_CONTEXT_MENU,
      payload: null,
    });
  };

  // Change podcast Title
  const changeTitle = (payload: string) => {
    dispatch({
      type: ETypes.PODCAST_TITLE,
      payload,
    });
  };

  return (
    <ThemeSettings.Provider
      value={{
        ...state,
        closeContextMenu,
        setEventEmitter,
        changeTitle,
    
      }}
    >
        {children}

    </ThemeSettings.Provider>
  );
};

export default ThemeSettings;
