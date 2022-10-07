import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export const Messages = () => {
  const messagesContainer = useRef();

  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId
  );

  const messages = useSelector((state) =>
    state.messages.ids
      .map((id) => state.messages.entities[id])
      .filter(({ channelId }) => channelId === currentChannelId)
  );

  useEffect(() => {
    messagesContainer.current.scrollTop =
      messagesContainer.current.scrollHeight;
  }, [messages]);

  return (
    <div
      id="messages-box"
      className="chat-messages overflow-auto px-5"
      ref={messagesContainer}
    >
      {messages.map(({ username, body, id }) => (
        <div className="text-break mb-2" key={id}>
          <b>{username}</b>:{body}
        </div>
      ))}
    </div>
  );
};
