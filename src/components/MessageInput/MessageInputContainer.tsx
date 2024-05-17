// src/components/MessageInput/MessageInputContainer.tsx
import { connect } from 'react-redux';
import MessageInput from './MessageInput';
import { sendMessage } from '../../redux/actions/messageAction';

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSubmit: (message: string) => dispatch(sendMessage(message)),
  };
};

const MessageInputContainer = connect(null, mapDispatchToProps)(MessageInput);

export default MessageInputContainer;
