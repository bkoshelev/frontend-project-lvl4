import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { ChannelList } from "../components/ChannelList";
import { Chat } from "../components/Chat";

import { useFetch } from "../hooks";
import { fetchChatData } from "../slices/chatSlice";
import { SocketProvider } from "../contexts";
import { ModalElement } from "../components/Modal";
import { useEffect } from "react";

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
        <Container className="my-4 overflow-hidden rounded shadow">
          <Row className="row flex-grow-1 flex-fill h-100">
            <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
              <ChannelList></ChannelList>
            </Col>
            <Col className="col p-0 h-100">
              <Chat></Chat>
            </Col>
          </Row>
          <ModalElement></ModalElement>
        </Container>
      </SocketProvider>
    );
  } else {
    return null;
  }
};
