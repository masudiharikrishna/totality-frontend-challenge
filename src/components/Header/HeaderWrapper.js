import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '.';

const HeaderWrapper = () => {
  const navigate = useNavigate();

  return <Header navigate={navigate} />;
};

export default HeaderWrapper;
