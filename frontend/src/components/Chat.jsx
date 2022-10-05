import { useSelector } from "react-redux";
import { selectors } from "../slices/channelsSlice";
import { useTranslation } from "react-i18next";

import { Messages } from "./Messages";
import { NewMessageInput } from "./NewMessageInput";

export const Chat = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector((state) => {
    return state.chat.currentChannelId;
  });
  const channelData = useSelector((state) =>
    selectors.selectById(state, currentChannelId)
  );

  const messages = useSelector((state) => {
    return state.messages.ids
      .map((id) => {
        return state.messages.entities[id];
      })
      .filter(({ channelId }) => {
        return channelId === currentChannelId;
      });
  });

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0 text-truncate"># {channelData.name}</p>
        <span className="text-muted">
          {t("chatPage.message", { count: messages.length })}
        </span>
      </div>
      <Messages></Messages>
      <div className="mt-auto px-5 py-3">
        <NewMessageInput></NewMessageInput>
      </div>
    </div>
  );
};
