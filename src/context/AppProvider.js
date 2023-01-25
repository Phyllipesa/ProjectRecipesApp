/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useState, useMemo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from './AppContext';
import useHandleChange from '../hooks/useHandleChange';

function AppProvider({ children }) {
  const email = useHandleChange('');
  const password = useHandleChange('');
  const history = useHistory();

  const [disabled, setDisabled] = useState(true);

  const validationError = () => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const num = 7;
    const allTests = regex.test(email.value) && password.value.length >= num;
    if (allTests) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleSubmit = () => {
    const user = {
      email: email.value,
    };
    localStorage.setItem('user', JSON.stringify(user));
    history.push('/meals');
  };

  useEffect(() => {
    validationError();
  }, [email, password]);

  const values = useMemo(
    () => ({
      email, password, disabled, handleSubmit,
    }),
    [
      email, password, disabled, handleSubmit,
    ],
  );

  return (
    <AppContext.Provider value={ values }>
      <div className="App">{children}</div>
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
