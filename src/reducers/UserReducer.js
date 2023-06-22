// reducer.js

const initialState = {
  object: {},
};

const userReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case 'USER_INFO':
      return {
        ...state,
        object: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
