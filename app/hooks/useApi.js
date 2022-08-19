import {useState} from 'react';
import {showToast} from '../components/AppToast/showToast';
import toast from '../components/AppToast/toast';

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
          showToast(toast.types.ERROR, error);
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
