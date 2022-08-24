import {useState} from 'react';
import {
  updateUserData,
  userDataTypes,
} from '../api/setup/patchApi/updateUserData';
import {showToast} from '../components/AppToast/showToast';
import toast from '../components/AppToast/toast';
import navigation from '../navigation/rootNavigation';
import routes from '../navigation/routes';

const infoAlert = () => showToast(toast.types.INFO, 'You are not Logged in');
const successAlert = message => showToast(toast.types.SUCCESS, message);
const errorAlert = error => showToast(toast.types.ERROR, error);
export const useCartState = user => {
  const [orderedItems, setOrderedItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);

  const addToCart = (productId, payload) => {
    if (user) {
      const previousOrderedItems = orderedItems;
      let nextOrderedItems = [...previousOrderedItems];
      if (
        !nextOrderedItems.some(elOrdered => elOrdered.productId === productId)
      ) {
        nextOrderedItems.unshift({
          productId,
          quantity: payload ? parseInt(payload) : 1,
        });
      } else {
        nextOrderedItems = nextOrderedItems.map(elOrdered =>
          elOrdered.productId === productId
            ? {
                ...elOrdered,
                quantity:
                  elOrdered.quantity + (payload ? parseInt(payload) : 1),
              }
            : elOrdered,
        );
      }

      setOrderedItems(nextOrderedItems);
      successAlert('Product added successfully');
      updateUserData(user.id, {[userDataTypes.ORDERED_ITEMS]: nextOrderedItems})
        .then(response => {})
        .catch(() => {
          setOrderedItems(previousOrderedItems);
          errorAlert('Product failed to be added to cart');
        });
    } else {
      infoAlert();
    }
  };

  const subFromCart = productId => {
    if (user) {
      const previousOrderedItems = orderedItems;
      const nextOrderedItems = [...previousOrderedItems].map(elOrdered =>
        elOrdered.productId === productId
          ? {
              ...elOrdered,
              quantity:
                elOrdered.quantity > 1
                  ? elOrdered.quantity - 1
                  : elOrdered.quantity,
            }
          : elOrdered,
      );
      setOrderedItems(nextOrderedItems);
      successAlert(`Product quantity has been updated successfully`);
      updateUserData(user.id, {
        [userDataTypes.ORDERED_ITEMS]: nextOrderedItems,
      }).catch(() => {
        setOrderedItems(previousOrderedItems);
        errorAlert('Product quantity failed to be updated in cart');
      });
    } else {
      infoAlert();
    }
  };

  const mutateCart = (productId, payload) => {
    if (user) {
      const previousOrderedItems = orderedItems;
      const nextOrderedItems = [...previousOrderedItems].map(elOrdered =>
        elOrdered.productId === productId
          ? {
              ...elOrdered,
              quantity: parseInt(payload),
            }
          : elOrdered,
      );
      setOrderedItems(nextOrderedItems);
      successAlert(`Product quantity has been updated successfully`);
      updateUserData(user.id, {
        [userDataTypes.ORDERED_ITEMS]: nextOrderedItems,
      }).catch(() => {
        setOrderedItems(previousOrderedItems);
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
      const previousOrderedItems = orderedItems;
      const nextOrderedItems = previousOrderedItems.filter(
        elOrdered => elOrdered.productId !== productId,
      );
      setOrderedItems(nextOrderedItems);
      successAlert('Product was removed from cart successfully');
      updateUserData(user.id, {
        [userDataTypes.ORDERED_ITEMS]: nextOrderedItems,
      }).catch(() => {
        setOrderedItems(previousOrderedItems);
        errorAlert('Product failed to be removed from cart');
      });
    } else {
      infoAlert();
    }
  };

  const actionTypes = {
    INITIALIZE_ORDER: 'INITIALIZE_ORDER',
    INITIALIZE_SAVE: 'INITIALIZE_SAVE',
    ADD_TO_CART: 'ADD_TO_CART',
    SUB_FROM_CART: 'SUB_FROM_CART',
    MUTATE_CART: 'MUTATE_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    ONSAVE: 'ONSAVE',
    CLEAR_ORDER: 'CLEAR_ORDER',
    CLEAR_SAVE: 'CLEAR_SAVE',
  };

  const dispatchAction = action => {
    const {type, id: productId, payload, data} = action;
    switch (type) {
      case actionTypes.INITIALIZE_ORDER:
        return setOrderedItems(data);

      case actionTypes.INITIALIZE_SAVE:
        return setSavedItems(data);

      case actionTypes.ADD_TO_CART:
        return addToCart(productId, payload, payload);

      case actionTypes.SUB_FROM_CART:
        return subFromCart(productId);

      case actionTypes.MUTATE_CART:
        return mutateCart(productId, payload);

      case actionTypes.REMOVE_FROM_CART:
        return removeFromCart(productId);

      case actionTypes.ONSAVE:
        return handleLike(productId);

      case actionTypes.CLEAR_ORDER:
        return setOrderedItems([]);

      case actionTypes.CLEAR_SAVE:
        return setSavedItems([]);

      default:
        return action;
    }
  };
  return {orderedItems, savedItems, dispatchAction, actionTypes};
};
