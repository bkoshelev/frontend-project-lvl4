import { useContext, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";

import { actions } from "./../slices/modalSlice";
import { selectors } from "../slices/channelsSlice";
import { SocketContext } from "../contexts";

const AddChannelModal = ({ handleClose }) => {
  const socket = useContext(SocketContext);
  const { t } = useTranslation();

  const channelNames = useSelector((state) =>
    selectors.selectAll(state).map(({ name }) => name)
  );

  const inputRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required(t("errors.required"))
        .notOneOf(channelNames, t("errors.uniq")),
    }),
    onSubmit: (values, { setSubmitting }) => {
      socket.emit("newChannel", values, () => {
        setSubmitting(false);
        handleClose();
        toast(t("createModal.success"));
      });
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Modal.Header closeButton>
        <Modal.Title>{t("createModal.title")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          ref={inputRef}
          name={"name"}
          onChange={formik.handleChange}
          value={formik.values.name}
          isInvalid={!!formik.errors.name}
        ></FormControl>
        <FormControl.Feedback type="invalid">
          {formik.errors.name}
        </FormControl.Feedback>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={formik.isSubmitting}
          variant="secondary"
          onClick={handleClose}
        >
          {t("createModal.cancel")}
        </Button>
        <Button disabled={formik.isSubmitting} variant="primary" type="submit">
          {t("createModal.agree")}
        </Button>
      </Modal.Footer>
    </Form>
  );
};

const RemoveChannel = ({ handleClose, extra }) => {
  const { t } = useTranslation();

  const socket = useContext(SocketContext);
  const formik = useFormik({
    onSubmit: (_, { setSubmitting }) => {
      socket.emit("removeChannel", extra, () => {
        setSubmitting(false);
        handleClose();
        toast(t("removeModal.success"));
      });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{t("removeModal.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t("removeModal.body")}</Modal.Body>
        <Modal.Footer>
          <Button
            disabled={formik.isSubmitting}
            variant="secondary"
            onClick={handleClose}
          >
            {t("removeModal.cancel")}
          </Button>
          <Button disabled={formik.isSubmitting} variant="danger" type="submit">
            {t("removeModal.agree")}
          </Button>
        </Modal.Footer>
      </form>
    </>
  );
};

const RenameChannelModal = ({ handleClose, extra }) => {
  const { t } = useTranslation();
  const socket = useContext(SocketContext);

  const changingElement = useSelector((state) =>
    selectors.selectById(state, extra.id)
  );

  const channelNames = useSelector((state) =>
    selectors.selectAll(state).map(({ name }) => name)
  );

  const inputRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      name: changingElement.name,
    },
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required(t("errors.required"))
        .notOneOf(channelNames, t("errors.uniq")),
    }),
    onSubmit: (values, { setSubmitting }) => {
      socket.emit("renameChannel", { ...values, ...extra }, () => {
        setSubmitting(false);
        handleClose();
        toast(t("renameModal.success"));
      });
    },
  });

  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Modal.Header closeButton>
        <Modal.Title>{t("renameModal.title")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          ref={inputRef}
          name={"name"}
          onChange={formik.handleChange}
          value={formik.values.name}
          isInvalid={!!formik.errors.name}
        ></FormControl>
        <FormControl.Feedback type="invalid">
          {formik.errors.name}
        </FormControl.Feedback>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={formik.isSubmitting}
          variant="secondary"
          onClick={handleClose}
        >
          {t("renameModal.cancel")}
        </Button>
        <Button disabled={formik.isSubmitting} variant="primary" type="submit">
          {t("renameModal.agree")}
        </Button>
      </Modal.Footer>
    </Form>
  );
};

const modals = {
  addChannel: AddChannelModal,
  removeChannel: RemoveChannel,
  renameChannel: RenameChannelModal,
};
export const ModalElement = () => {
  const dispatch = useDispatch();

  const {
    isOpened: show,
    type,
    extra,
  } = useSelector((state) => {
    return state.modal;
  });

  const handleClose = () => {
    dispatch(actions.closeModal());
  };

  const Content = modals[type];

  return (
    <Modal show={show} onHide={handleClose} centered>
      {show && <Content handleClose={handleClose} extra={extra}></Content>}
    </Modal>
  );
};
