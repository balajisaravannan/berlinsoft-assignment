export const sendMessage = (message: string, date: Date) => {
  return {
    type: 'SEND_MESSAGE',
    payload: {
      message,
      date
    },
  };
};