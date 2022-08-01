import {useState} from 'react';

export const useApi = apiFunc => {
  // const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(null);

  const request = (...args) => {
    setLoading(true);

    return new Promise(function (resolve, reject) {
      apiFunc(...args)
        .then(data => {
          // setData(data);
          // alert('Sign in Successful');
          setError(false);
          setLoading(false);
          resolve(data);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
          reject(error);
        });
      // .finally(() => {
      //   setLoading(false);
      // });
    });
  };

  // return {data, error, loading, request};
  return {error, loading, request};
};
