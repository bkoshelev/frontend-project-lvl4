import { useContext, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as LeoProfanity from "leo-profanity";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import { getUserId } from "../utils";
import { SocketContext } from "../contexts";

import { ReactComponent as ArrowRight } from "./../icons/arrow_right.svg";

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
      noValidate
      className="border rounded-2"
      onSubmit={formik.handleSubmit}
    >
      <InputGroup>
        <Form.Control
          name="body"
          aria-label={t("chatPage.inputLabel")}
          placeholder={t("chatPage.writeText")}
          className="border-0 p-0 ps-2"
          onChange={formik.handleChange}
          value={formik.values.body}
          ref={inputRef}
        />
        <span className="visually-hidden">Отправить</span>
        <InputGroup.Text id="basic-addon2" className="">
          <ArrowRight></ArrowRight>
        </InputGroup.Text>
      </InputGroup>
    </form>
  );
};
