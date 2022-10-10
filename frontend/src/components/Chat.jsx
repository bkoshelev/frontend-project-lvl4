import React from 'react';

import Messages from './Messages';
import NewMessageInput from './NewMessageInput';
import ChatHeader from './ChatHeader';

const Chat = () => (
  <div className="d-flex flex-column h-100">
    <ChatHeader />
    <Messages />
    <NewMessageInput />
  </div>
);

export default Chat;
