import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { selectors } from '../slices/channelsSlice';

const ChatHeader = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId,
  );
  const channelData = useSelector((state) => selectors.selectById(state, currentChannelId));

  const messages = useSelector((state) => state.messages.ids
    .map((id) => state.messages.entities[id])
    .filter(({ channelId }) => channelId === currentChannelId));

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p>
        <b className="m-0 text-truncate">
          #
          {channelData.name}
        </b>
      </p>
      <span className="text-muted">
        {t('chatPage.message', { count: messages.length })}
      </span>
    </div>
  );
};

export default ChatHeader;
