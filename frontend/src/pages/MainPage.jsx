import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Container from 'react-bootstrap/esm/Container';
import ChannelList from '../components/ChannelList';
import Chat from '../components/Chat';
import Modal from '../components/Modal';

import { useFetch } from '../hooks';
import { fetchChatData } from '../slices/channelsSlice';
import { SocketProvider } from '../contexts';

const MainPage = () => {
  const status = useFetch(fetchChatData);
  const { t } = useTranslation();
  const toastText = t('chatPage.fetchDataError');

  useEffect(() => {
    if (status === 'failed') {
      toast(toastText);
    }
  }, [status, toastText]);

  if (status === 'succeeded') {
    return (
      <SocketProvider>
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
          <Row className="h-100 bg-white flex-md-row">
            <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
              <ChannelList />
            </Col>
            <Col className="p-0 h-100">
              <Chat />
            </Col>
          </Row>
        </Container>
        <Modal />
      </SocketProvider>
    );
  }
  return null;
};

export default MainPage;
