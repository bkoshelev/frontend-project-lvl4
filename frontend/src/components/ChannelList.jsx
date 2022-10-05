import { useDispatch, useSelector } from "react-redux";
import Nav from "react-bootstrap/Nav";
import { selectors } from "../slices/channelsSlice";
import { actions } from "../slices/chatSlice";
import { actions as modalActions } from "./../slices/modalSlice";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import SplitButton from "react-bootstrap/SplitButton";
import { useTranslation } from "react-i18next";

export const ChannelList = () => {
  const { t } = useTranslation();

  const channelsData = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((state) => {
    return state.chat.currentChannelId;
  });
  const dispatch = useDispatch();

  const handleClickAddChannel = () => {
    dispatch(modalActions.openModal({ type: "addChannel" }));
  };

  const handleClickRemoveChannel = (id) => () => {
    dispatch(modalActions.openModal({ type: "removeChannel", extra: { id } }));
  };

  const handleClickRenameChannel = (id) => () => {
    dispatch(modalActions.openModal({ type: "renameChannel", extra: { id } }));
  };

  const handleSelect = (selectedKey) => () => {
    dispatch(actions.changeCurrentChannelId(Number(selectedKey)));
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t("chatPage.channels")}</span>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={handleClickAddChannel}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <Nav className="flex-column nav-pills nav-fill px-2 gap-2 btn-group">
        {channelsData.map(({ name, id, removable }) => {
          return removable ? (
            <SplitButton
              key={id}
              variant={id === currentChannelId ? "secondary" : "light"}
              title={`# ${name}`}
              onClick={handleSelect(id)}
            >
              <Dropdown.Item
                active={false}
                onClick={handleClickRemoveChannel(id)}
              >
                Удалить
              </Dropdown.Item>

              <Dropdown.Item
                active={false}
                onClick={handleClickRenameChannel(id)}
              >
                Переименовать
              </Dropdown.Item>
            </SplitButton>
          ) : (
            <Button
              key={id}
              variant={id === currentChannelId ? "secondary" : "light"}
              title={name}
              onClick={handleSelect(id)}
              className="w-100"
            >
              # {name}
            </Button>
          );
        })}
      </Nav>
    </>
  );
};
