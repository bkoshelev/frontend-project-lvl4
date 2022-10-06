import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Messages } from "./Messages";
import { NewMessageInput } from "./NewMessageInput";

import { selectors } from "../slices/channelsSlice";

export const Chat = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId
  );
  const channelData = useSelector((state) =>
    selectors.selectById(state, currentChannelId)
  );

  const messages = useSelector((state) =>
    state.messages.ids
      .map((id) => state.messages.entities[id])
      .filter(({ channelId }) => channelId === currentChannelId)
  );

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p>
          <b className="m-0 text-truncate">#{channelData.name}</b>
        </p>
        <span className="text-muted">
          {t("chatPage.message", { count: messages.length })}
        </span>
      </div>
      <Messages />
      <div className="mt-auto px-5 py-3">
        <NewMessageInput />
      </div>
    </div>
  );
};
