const ruLocale = {
  translation: {
    header: {
      hexletLogo: 'Hexlet Chat',
      exit: 'Выйти',
    },
    errorPage: {
      title: 'Страница не найдена',
      body: 'Но вы можете перейти на главную страницу',
    },
    loginPage: {
      signin: 'Войти',
      nickNameLabel: 'Ваш ник',
      passwordLabel: 'Пароль',
      error: 'Неверные имя пользователя или пароль',
      noAccount: 'Нет аккаунта?',
      toSignupPageLink: 'Регистрация',
    },
    chatPage: {
      channels: 'Каналы',
      writeText: 'Введите сообщение...',
      message_zero: '{{count}} сообщений',
      message_one: '{{count}} сообщение',
      message_few: '{{count}} сообщения',
      message_many: '{{count}} сообщений',
      fetchDataError: 'Ошибка соединения',
      socketConnectionError: 'Ошибка соединения',
      removeLabel: 'Удалить',
      renameLabel: 'Переименовать',
      channelSettingsLabel: 'Управление каналом',
      inputLabel: 'Новое сообщение',
      sendNewMessage: 'Отправить',
    },
    signupPage: {
      signup: 'Зарегистрироваться',
      confirmPasswordLabel: 'Подтвердите пароль',
      passwordLabel: 'Пароль',
      usernameLabel: 'Имя пользователя',
      heading: 'Регистрация',
    },
    createModal: {
      success: 'Канал создан',
      title: 'Добавить канал',
      cancel: 'Отменить',
      agree: 'Отправить',
      inputLabel: 'Имя канала',
    },
    removeModal: {
      success: 'Канал удалён',
      title: 'Удалить канал',
      body: 'Вы уверены?',
      cancel: 'Отменить',
      agree: 'Удалить',
    },
    renameModal: {
      success: 'Канал переименован',
      title: 'Переименовать канал',
      cancel: 'Отменить',
      agree: 'Отправить',
      inputLabel: 'Имя канала',
    },
    errors: {
      required: 'Обязательное поле',
      uniq: 'Должно быть уникальным',
      min3: 'От 3 до 20 символов',
      max20: 'От 3 до 20 символов',
      min6: 'Не менее 6 символов',
      matchPassword: 'Пароли должны совпадать',
      userAlreadyExist: 'Такой пользователь уже существует',
    },
  },
};

export default ruLocale;
