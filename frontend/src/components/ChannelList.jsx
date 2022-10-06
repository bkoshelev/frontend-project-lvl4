import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

import { selectors, actions } from '../slices/channelsSlice';
import { actions as modalActions } from '../slices/modalSlice';

import { ReactComponent as Plus } from '../icons/plus.svg';

export const ChannelList = () => {
  const { t } = useTranslation();

  const channelsData = useSelector(selectors.selectAll);
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId,
  );
  const dispatch = useDispatch();

  const handleClickAddChannel = () => {
    dispatch(modalActions.openModal({ type: 'addChannel' }));
  };

  const handleClickRemoveChannel = (id) => () => {
    dispatch(modalActions.openModal({ type: 'removeChannel', extra: { id } }));
  };

  const handleClickRenameChannel = (id) => () => {
    dispatch(modalActions.openModal({ type: 'renameChannel', extra: { id } }));
  };

  const handleSelect = (selectedKey) => () => {
    dispatch(actions.changeCurrentChannelId(Number(selectedKey)));
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('chatPage.channels')}</span>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={handleClickAddChannel}
        >
          <Plus />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul className="flex-column nav-pills nav-fill px-2 gap-2">
        {channelsData.map(({ name, id, removable }) => (removable ? (
          <Dropdown
            as={ButtonGroup}
            key={id}
            label={t('chatPage.channelSettingsLabel')}
            className="w-100"
          >
            <Button
              variant={id === currentChannelId ? 'secondary' : 'light'}
              onClick={handleSelect(id)}
              className="text-truncate"
            >
              {`# ${name}`}
            </Button>
            <Dropdown.Toggle
              as={Button}
              split
              id="dropdown-split-basic"
              variant={id === currentChannelId ? 'secondary' : 'light'}
              label="test"
            >
              <span className="visually-hidden">
                {t('chatPage.channelSettingsLabel')}
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleClickRemoveChannel(id)}>
                {t('chatPage.removeLabel')}
              </Dropdown.Item>
              <Dropdown.Item onClick={handleClickRenameChannel(id)}>
                {t('chatPage.renameLabel')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Button
            key={id}
            variant={id === currentChannelId ? 'secondary' : 'light'}
            title={name}
            onClick={handleSelect(id)}
            className="w-100"
          >
            #
            {' '}
            {name}
          </Button>
        )))}
      </ul>
    </>
  );
};
