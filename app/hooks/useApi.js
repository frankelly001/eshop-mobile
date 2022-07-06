import {useState} from 'react';

export const useApi = apiFunc => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const request = (...args) => {
    setLoading(true);
    apiFunc(...args)
      .then(data => {
        setData(data);
        alert('Sign in Successful');
        setLoading(false);
        setError(false);
      })
      .catch(error => {
        setError(error.message);
        // console.log(error.message);
        setLoading(false);
        setData(undefined);
      });
  };

  return {data, error, loading, request};
};
