import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import ChannelList from '../components/ChannelList';
import Chat from '../components/Chat';
import Modal from '../components/Modal';

import channelsAPI from '../api/channels';
import accountAPI from '../api/account';
import routes from '../routes';

const useGetChatData = () => {
  const { t } = useTranslation();
  const status = useSelector((state) => state.channels.loading);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        channelsAPI.chatDataFetch();
      } catch (error) {
        if (error.status === 401) {
          accountAPI.logOut().then(() => {
            navigate(routes.loginPage());
          });
        }
      }
    };
    fetchData();
  }, []);

  const toastText = t('chatPage.fetchDataError');

  useEffect(() => {
    if (status === 'failed') {
      toast(toastText);
    }
  }, [status, toastText]);

  return status;
};

const MainPage = () => {
  const status = useGetChatData();

  if (status === 'succeeded') {
    return (
      <>
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
      </>
    );
  }
  return null;
};

export default MainPage;
