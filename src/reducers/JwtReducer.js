// reducer.js

const initialState = {
  object: {},
};

const jwtReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case 'JWT':
      return {
        ...state,
        object: action.payload,
      };
    default:
      return state;
  }
};

export default jwtReducer;
