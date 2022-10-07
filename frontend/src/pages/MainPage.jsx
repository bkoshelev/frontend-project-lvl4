import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Container from "react-bootstrap/esm/Container";
import { ChannelList } from "../components/ChannelList";
import { Chat } from "../components/Chat";
import { ModalElement } from "../components/Modal";

import { useFetch } from "../hooks";
import { fetchChatData } from "../slices/channelsSlice";
import { SocketProvider } from "../contexts";

export const MainPage = () => {
  const status = useFetch(fetchChatData);
  const { t } = useTranslation();
  const toastText = t("chatPage.fetchDataError");

  useEffect(() => {
    if (status === "failed") {
      toast(toastText);
    }
  }, [status, toastText]);

  if (status === "succeeded") {
    return (
      <SocketProvider>
        <Container className="h-100 d-flex">
          <Row className="flex-grow-1 shadow my-4">
            <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
              <ChannelList />
            </Col>
            <Col className="col p-0 h-100">
              <Chat />
            </Col>
          </Row>
        </Container>
        <ModalElement />
      </SocketProvider>
    );
  }
  return null;
};
