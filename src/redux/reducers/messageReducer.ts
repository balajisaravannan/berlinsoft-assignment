// src/redux/reducers/messageReducer.ts
const initialState = {
    messages: [],
  };
  
  const messageReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'SEND_MESSAGE':
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default messageReducer;
  