import React from 'react';

const LoginMessage = ({ message }) => {
  return message && <p className="mt-3 text-danger">{message}</p>;
};

export default LoginMessage;
