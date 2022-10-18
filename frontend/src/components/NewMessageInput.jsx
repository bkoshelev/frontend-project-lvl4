import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as LeoProfanity from 'leo-profanity';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import { ReactComponent as ArrowRight } from '../icons/arrow_right.svg';
import useMessagesAPI from '../api/messages';
import useUserAPI from '../api/user';

LeoProfanity.loadDictionary('ru');

const NewMessageInput = () => {
  const inputRef = useRef();
  const { t } = useTranslation();
  const messagesAPI = useMessagesAPI();
  const userAPI = useUserAPI();

  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId,
  );

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values, helpers) => {
      messagesAPI.createNewMessage(
        {
          body: LeoProfanity.clean(values.body),
          channelId: currentChannelId,
          username: userAPI.getUserData().username,
        },
      )
        .then(() => {
          helpers.resetForm();
        });
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  return (
    <div className="mt-auto px-5 py-3">
      <form
        noValidate
        className="border rounded-2"
        onSubmit={formik.handleSubmit}
      >
        <InputGroup>
          <Form.Control
            name="body"
            aria-label={t('chatPage.inputLabel')}
            placeholder={t('chatPage.writeText')}
            className="border-0 p-0 ps-2"
            onChange={formik.handleChange}
            value={formik.values.body}
            ref={inputRef}
            disabled={formik.isSubmitting}
            autoComplete="off"
          />
          <span className="visually-hidden">{t('chatPage.sendNewMessage')}</span>
          <InputGroup.Text id="basic-addon2" className="">
            <ArrowRight />
          </InputGroup.Text>
        </InputGroup>
      </form>
    </div>
  );
};

export default NewMessageInput;
