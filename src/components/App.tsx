
import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import MessageInput from './MessageInput/MessageInput';
import MessageList from './MessageList';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className='relative'>
        <MessageInput />
        
      </div>
    </Provider>
  );
};

export default App;