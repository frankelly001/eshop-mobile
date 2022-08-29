import {useState} from 'react';
import {
  updateUserData,
  userDataTypes,
} from '../api/setup/patchApi/updateUserData';
import {addOrder} from '../api/setup/postApi/addOrder';
import {showToast} from '../components/AppToast/showToast';
import toast from '../components/AppToast/toast';
import navigation from '../navigation/rootNavigation';
import routes from '../navigation/routes';

const infoAlert = () => showToast(toast.types.INFO, 'You are not Logged in');
const successAlert = message => showToast(toast.types.SUCCESS, message);
const errorAlert = error => showToast(toast.types.ERROR, error);

export const useCartState = user => {
  const [cartItems, setCartItems] = useState([]);
  const [orderedItems, setOrderedItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);

  const addToCart = (productId, payload) => {
    if (user) {
      const previousCartItems = cartItems;
      let nextCartItems = [...previousCartItems];
      if (
        !nextCartItems.some(elCartItem => elCartItem.productId === productId)
      ) {
        nextCartItems.unshift({
          productId,
          quantity: payload ? parseInt(payload) : 1,
        });
      } else {
        nextCartItems = nextCartItems.map(elCartItem =>
          elCartItem.productId === productId
            ? {
                ...elCartItem,
                quantity:
                  elCartItem.quantity + (payload ? parseInt(payload) : 1),
              }
            : elCartItem,
        );
      }

      setCartItems(nextCartItems);
      successAlert('Product added successfully');
      updateUserData(user.id, {[userDataTypes.CART_ITEMS]: nextCartItems})
        .then(response => {})
        .catch(() => {
          setCartItems(previousCartItems);
          errorAlert('Product failed to be added to cart');
        });
    } else {
      infoAlert();
    }
  };

  const subFromCart = productId => {
    if (user) {
      const previousCartItems = cartItems;
      const nextCartItems = [...previousCartItems].map(elCartItem =>
        elCartItem.productId === productId
          ? {
              ...elCartItem,
              quantity:
                elCartItem.quantity > 1
                  ? elCartItem.quantity - 1
                  : elCartItem.quantity,
            }
          : elCartItem,
      );
      setCartItems(nextCartItems);
      successAlert(`Product quantity has been updated successfully`);
      updateUserData(user.id, {
        [userDataTypes.CART_ITEMS]: nextCartItems,
      }).catch(() => {
        setCartItems(previousCartItems);
        errorAlert('Product quantity failed to be updated in cart');
      });
    } else {
      infoAlert();
    }
  };

  const mutateCart = (productId, payload) => {
    if (user) {
      const previousCartItems = cartItems;
      const nextCartItems = [...previousCartItems].map(elCartItem =>
        elCartItem.productId === productId
          ? {
              ...elCartItem,
              quantity: parseInt(payload),
            }
          : elCartItem,
      );
      setCartItems(nextCartItems);
      successAlert(`Product quantity has been updated successfully`);
      updateUserData(user.id, {
        [userDataTypes.CART_ITEMS]: nextCartItems,
      }).catch(() => {
        setCartItems(previousCartItems);
        errorAlert('Product quantity failed to be updated in cart');
      });
    } else {
      infoAlert();
    }
  };

  const handleLike = productId => {
    const previousLikeProducts = savedItems;
    if (user) {
      let nextLikedProducts = [...previousLikeProducts];
      if (nextLikedProducts.includes(productId)) {
        nextLikedProducts = nextLikedProducts.filter(
          productIdLiked => productIdLiked !== productId,
        );
        successAlert(`Product successfully removed from your wishlist`);
      } else {
        nextLikedProducts.unshift(productId);
        successAlert(`Product successfully added to your wishlist`);
      }
      setSavedItems(nextLikedProducts);
      updateUserData(user.id, {[userDataTypes.SAVED_ITEMS]: nextLikedProducts})
        .then(response => {})
        .catch(error => {
          setSavedItems(previousLikeProducts);
          errorAlert('wishlist failed to be updated');
          console.log(error, 'heyyyyyyyyy');
        });
    } else {
      infoAlert();
    }
  };

  const removeFromCart = productId => {
    if (user) {
      const previousCartItems = cartItems;
      const nextCartItems = previousCartItems.filter(
        elCartItem => elCartItem.productId !== productId,
      );
      setCartItems(nextCartItems);
      successAlert('Product was removed from cart successfully');
      updateUserData(user.id, {
        [userDataTypes.CART_ITEMS]: nextCartItems,
      }).catch(() => {
        setCartItems(previousCartItems);
        errorAlert('Product failed to be removed from cart');
      });
    } else {
      infoAlert();
    }
  };

  const addToOrders = orderData => {
    if (user) {
      const data = {
        userId: user.id,
        ...orderData,
      };
      const previousOrderedItems = orderedItems;
      const nextOrderedItems = [data, ...previousOrderedItems];

      setOrderedItems(nextOrderedItems);
      addOrder(orderData.transaction_info?.transaction_id ?? user.id, data)
        .then(() => {
          setCartItems([]);
          updateUserData(user.id, {
            [userDataTypes.CART_ITEMS]: [],
          });
        })
        .catch(() => {
          setOrderedItems(previousOrderedItems);
        });
    }
  };

  const actionTypes = {
    INITIALIZE_CART: 'INITIALIZE_CART',
    INITIALIZE_SAVE: 'INITIALIZE_SAVE',
    INITIALIZE_ORDERS: 'INITIALIZE_ORDERS',
    ADD_TO_ORDERS: 'ADD_TO_ORDERS',
    ADD_TO_CART: 'ADD_TO_CART',
    SUB_FROM_CART: 'SUB_FROM_CART',
    MUTATE_CART: 'MUTATE_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    ONSAVE: 'ONSAVE',
    CLEAR_CART: 'CLEAR_CART',
    CLEAR_SAVE: 'CLEAR_SAVE',
  };

  const dispatchAction = action => {
    const {type, id: productId, payload} = action;
    switch (type) {
      case actionTypes.INITIALIZE_CART:
        return setCartItems(payload);

      case actionTypes.INITIALIZE_ORDERS:
        return setOrderedItems(payload);

      case actionTypes.INITIALIZE_SAVE:
        return setSavedItems(payload);

      case actionTypes.ADD_TO_ORDERS:
        return addToOrders(payload);

      case actionTypes.ADD_TO_CART:
        return addToCart(productId, payload);

      case actionTypes.SUB_FROM_CART:
        return subFromCart(productId);

      case actionTypes.MUTATE_CART:
        return mutateCart(productId, payload);

      case actionTypes.REMOVE_FROM_CART:
        return removeFromCart(productId);

      case actionTypes.ONSAVE:
        return handleLike(productId);

      case actionTypes.CLEAR_CART:
        return setCartItems([]);

      case actionTypes.CLEAR_SAVE:
        return setSavedItems([]);

      default:
        return action;
    }
  };
  return {cartItems, orderedItems, savedItems, dispatchAction, actionTypes};
};
