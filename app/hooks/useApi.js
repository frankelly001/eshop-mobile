import {useState} from 'react';

export const useApi = apiFunc => {
  // const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const request = (...args) => {
    setLoading(true);

    return new Promise(function (resolve, reject) {
      apiFunc(...args)
        .then(data => {
          // setData(data);
          // alert('Sign in Successful');
          setError(false);
          resolve(data);
        })
        .catch(error => {
          setError(error.message);
          // setData(undefined);
          // console.log(error.message);
          reject(error.message);
        });
      setLoading(false);
    });
  };

  // return {data, error, loading, request};
  return {error, loading, request};
};
