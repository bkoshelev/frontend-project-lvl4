import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

export const Messages = () => {
  const messagesContainer = useRef();

  const currentChannelId = useSelector((state) => {
    return state.chat.currentChannelId;
  });

  const messages = useSelector((state) => {
    return state.messages.ids
      .map((id) => {
        return state.messages.entities[id];
      })
      .filter(({ channelId }) => {
        return channelId === currentChannelId;
      });
  });

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
      {messages.map(({ username, body, id }) => {
        return (
          <div className="text-break mb-2" key={id}>
            <b>{username}</b>: {body}
          </div>
        );
      })}
    </div>
  );
};
