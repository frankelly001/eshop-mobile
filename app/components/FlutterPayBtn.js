import React, {useState} from 'react';
import AppGradientBtn from './AppGradientBtn';
import {PayWithFlutterwave} from 'flutterwave-react-native';
import {formatToCurrency} from '../utilities/formatToCurr';
import AppButton from './AppButton';
import {showToast} from './AppToast/showToast';
import toast from './AppToast/toast';
import PaySuccessModal from './PaySuccessModal';

const FlutterPayBtn = ({total, deliveryInfo}) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  // length must be a num
  const generateTransactionRef = length => {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `flw_tx_ref_${result}`;
  };

  // console.log(generateTransactionRef(10));
  // {"status": "successful", "transaction_id": "3684184", "tx_ref": "flw_tx_ref_iITrLsoYvW"}

  const handleOnRedirect = data => {
    console.log(data, "incase status it's successful, cancelled or failed");
    if (data.status === 'successful') {
      showToast(toast.types.SUCCESS, 'Transaction Successful');
      setShowSuccessModal(true);
    } else if (data.status === 'cancelled') {
      showToast(toast.types.ERROR, 'Transaction Cancelled');
    }
  };

  // if (1) return null;
  return (
    <>
      <PaySuccessModal visible={showSuccessModal} />
      <PayWithFlutterwave
        onRedirect={handleOnRedirect}
        options={{
          tx_ref: generateTransactionRef(10),
          authorization: 'FLWPUBK_TEST-e1399dbd0b80e614e77eb9000e0ba5b2-X',
          customer: {
            email: deliveryInfo.email,
          },
          amount: total,
          currency: 'NGN',
          payment_options: 'card',
        }}
        customButton={({disabled, onPress, isInitializing}) => (
          <AppGradientBtn
            label={`PAY NOW: ${formatToCurrency(total)}`}
            labelStyle={{fontWeight: '700'}}
            onPress={onPress}
            isBusy={isInitializing}
            disabled={disabled}
          />
        )}
      />
    </>
  );
};

export default FlutterPayBtn;
