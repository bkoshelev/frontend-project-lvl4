import { useFormik } from "formik";
import { getUserId } from "../utils";
import { useContext, useEffect, useRef } from "react";
import { SocketContext } from "../contexts";
import * as LeoProfanity from "leo-profanity";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

LeoProfanity.loadDictionary("ru");

export const NewMessageInput = () => {
  const socket = useContext(SocketContext);
  const inputRef = useRef();
  const { t } = useTranslation();

  const currentChannelId = useSelector((state) => {
    return state.chat.currentChannelId;
  });

  const formik = useFormik({
    initialValues: {
      body: "",
    },
    onSubmit: (values, helpers) => {
      socket.emit("newMessage", {
        body: LeoProfanity.clean(values.body),
        channelId: currentChannelId,
        username: getUserId().username,
      });
      helpers.resetForm();
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form
      noValidate=""
      className="py-1 border rounded-2"
      onSubmit={formik.handleSubmit}
    >
      <div className="input-group has-validation">
        <input
          name="body"
          aria-label="Новое сообщение"
          placeholder={t("chatPage.writeText")}
          className="border-0 p-0 ps-2 form-control"
          onChange={formik.handleChange}
          value={formik.values.body}
          ref={inputRef}
        />
        <button type="submit" className="btn btn-group-vertical" disabled="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width={20}
            height={20}
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
            />
          </svg>
          <span className="visually-hidden">Отправить</span>
        </button>
      </div>
    </form>
  );
};
