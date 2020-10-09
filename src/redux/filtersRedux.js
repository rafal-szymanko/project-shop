/* SELECTORS */

// action name creator
const reducerName = 'filters';
const createActionName = name => `app/${reducerName}/${name}`;

// action types
export const CHANGE_PHRASE = createActionName('CHANGE_PHRASE');


// action creators
export const changeSearchPhrase = payload => ({ payload, type: CHANGE_PHRASE });

// reducer
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case CHANGE_PHRASE:
      return {
        searchPhrase: action.payload,
      };
    default:
      return statePart;
  }
};
