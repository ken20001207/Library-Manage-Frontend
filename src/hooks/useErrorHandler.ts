import { Notification } from 'rsuite';

export const useErrorHandler = () => {

  const handleError = (err: any) => {

    if (err instanceof SyntaxError) {
      console.error(err);
      if (err.message.includes('Unexpected token') &&
        err.message.includes('in JSON at position')) {
        Notification.error({
          title: '发生错误',
          description: '后端服务回传了一个无法解析的回应',
          placement: 'bottomStart'
        });
        return;
      }
    }

    if (err instanceof TypeError) {
      console.error(err);
      if (err.message.includes('Failed to fetch')) {
        Notification.error({
          title: '发生错误',
          description: '网路请求失败，请检查网路状态或后端服务状态',
          placement: 'bottomStart'
        });
        return;
      }
    }

    switch (err.code) {
    case 'CARD_NOT_FOUND':
      Notification.error({
        title: '发生错误',
        description: '卡号不存在，请确认后再试一次',
        placement: 'bottomStart'
      });
      break;
    case 'BOOK_NOT_FOUND':
      Notification.error({
        title: '发生错误',
        description: '书号不存在，请确认后再试一次',
        placement: 'bottomStart'
      });
      break;
    default:
      let displayCode = '';
      if (typeof err === 'string') displayCode = err;
      if (typeof err.message === 'string') displayCode = err.message;
      Notification.error({
        title: '发生例外错误',
        description: '发生了没有预期到的错误 (' + displayCode + ')',
        placement: 'bottomStart'
      });
      console.error(err);
    }
  };

  return { handleError };
};
