import React, {useContext, useState} from 'react';
import AppGradientBtn from './AppGradientBtn';
import {PayWithFlutterwave} from 'flutterwave-react-native';
import {formatToCurrency} from '../utilities/formatToCurr';
import AppButton from './AppButton';
import {showToast} from './AppToast/showToast';
import toast from './AppToast/toast';
import PaySuccessModal from './PaySuccessModal';
import AuthContext from '../auth/AuthContext';
import {firestore} from '../api/setup/config';
import {
  updateUserData,
  userDataTypes,
} from '../api/setup/patchApi/updateUserData';

const FlutterPayBtn = ({
  deliveryInfo,
  productsInCart,
  payment_summary,
  addToOrders,
  onDisplaySuccessModal,
}) => {
  // const {productsInCart, subTotal, delivery, total, addToOrders} =
  //   useContext(AuthContext);
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

  // const orderData = {
  //   date: firestore.FieldValue.serverTimestamp(),
  //   delivery_info: deliveryInfo,
  //   transaction_info: {
  //     status: 'successful',
  //     transaction_id: '3684184',
  //     tx_ref: 'flw_tx_ref_iITrLsoYvW',
  //   },
  //   ordered_products: productsInCart,
  //   payment_summary: {
  //     subTotal,
  //     delivery,
  //     total,
  //   },
  //   orderStatus: 'pending',
  // };
  // {"status": "successful", "transaction_id": "3684184", "tx_ref": "flw_tx_ref_iITrLsoYvW"}

  const handleOnRedirect = transactionInfo => {
    if (transactionInfo.status === 'successful') {
      const orderData = {
        date_ordered: firestore.FieldValue.serverTimestamp(),
        date_delivered: '',
        delivery_info: deliveryInfo,
        transaction_info: transactionInfo,
        ordered_products: productsInCart.map(el => {
          return {
            id: el.id,
            title: el.title,
            price: el.price,
            quantity: el.quantity,
            image: el.images[0],
          };
        }),
        payment_summary,
        orderStatus: 'pending',
      };
      addToOrders(orderData);
      showToast(toast.types.SUCCESS, 'Transaction Successful');
      onDisplaySuccessModal(true);
    } else if (transactionInfo.status === 'cancelled') {
      showToast(toast.types.ERROR, 'Transaction Cancelled');
    } else {
      showToast(toast.types.ERROR, `Transaction ${transactionInfo.status}`);
    }
  };

  // if (1) return null;
  return (
    <>
      {/* <PaySuccessModal visible={showSuccessModal} /> */}
      <PayWithFlutterwave
        onRedirect={handleOnRedirect}
        options={{
          tx_ref: generateTransactionRef(10),
          authorization: 'FLWPUBK_TEST-e1399dbd0b80e614e77eb9000e0ba5b2-X',
          customer: {
            email: deliveryInfo.email,
          },
          amount: payment_summary.total,
          currency: 'NGN',
          payment_options: 'card',
        }}
        customButton={({disabled, onPress, isInitializing}) => (
          <AppGradientBtn
            label={`PAY NOW: ${formatToCurrency(payment_summary?.total)}`}
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
