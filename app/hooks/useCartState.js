import {useState} from 'react';
import {
  updateUserData,
  userDataTypes,
} from '../api/setup/patchApi/updateUserData';
import navigation from '../navigation/rootNavigation';
import routes from '../navigation/routes';

export const useCartState = user => {
  const [orderedItems, setOrderedItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);

  //   console.log(orderedItems, 'zucciiiiiiiiiiiiiiiiiiiiiiiii');

  const navigate = () => navigation.navigate(routes.LOGIN);

  const addToCart = (id, payload) => {
    if (user) {
      const previousOrderedItems = orderedItems;
      let nextOrderedItems = [...orderedItems];
      if (!nextOrderedItems.some(elOrdered => elOrdered.productId === id)) {
        nextOrderedItems.push({
          productId: id,
          quantity: payload ? parseInt(payload) : 1,
        });
      } else {
        nextOrderedItems = nextOrderedItems.map(elOrdered =>
          elOrdered.productId === id
            ? {
                productId: id,
                quantity:
                  elOrdered.quantity + (payload ? parseInt(payload) : 1),
              }
            : elOrdered,
        );
      }

      setOrderedItems(nextOrderedItems);
      updateUserData(user.id, userDataTypes.ORDERED_ITEMS, nextOrderedItems)
        .then(response => {})
        .catch(() => {
          setOrderedItems(previousOrderedItems);
        });
    } else {
      navigate();
    }
  };

  const subFromCart = id => {
    if (user) {
      const previousOrderedItems = orderedItems;
      const nextOrderedItems = [...orderedItems].map(elOrdered =>
        elOrdered.productId === id
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
      updateUserData(
        user.id,
        userDataTypes.ORDERED_ITEMS,
        nextOrderedItems,
      ).catch(() => {
        setOrderedItems(previousOrderedItems);
      });
    } else {
      navigate();
    }
  };

  const mutateCart = (id, payload) => {
    if (user) {
      const previousOrderedItems = orderedItems;
      const nextOrderedItems = [...orderedItems].map(elOrdered =>
        elOrdered.productId === id
          ? {
              ...elOrdered,
              quantity: parseInt(payload),
            }
          : elOrdered,
      );
      setOrderedItems(nextOrderedItems);
      updateUserData(
        user.id,
        userDataTypes.ORDERED_ITEMS,
        nextOrderedItems,
      ).catch(() => {
        setOrderedItems(previousOrderedItems);
      });
    } else {
      navigate();
    }
  };

  const handleLike = id => {
    const previousLikeProducts = savedItems;
    if (user) {
      let likedProducts = [...savedItems];
      if (likedProducts.includes(id)) {
        likedProducts = likedProducts.filter(productId => productId !== id);
      } else {
        likedProducts.push(id);
      }
      setSavedItems(likedProducts);

      updateUserData(user.id, userDataTypes.SAVED_ITEMS, likedProducts)
        .then(response => {})
        .catch(error => {
          setSavedItems(previousLikeProducts);
          //   console.log(error, 'heyyyyyyyyy');
        });
    } else {
      navigate();
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
    const {type, id, payload, data} = action;
    switch (type) {
      case actionTypes.INITIALIZE_ORDER:
        return setOrderedItems(data);

      case actionTypes.INITIALIZE_SAVE:
        return setSavedItems(data);

      case actionTypes.ADD_TO_CART:
        return addToCart(id, payload, payload);

      case actionTypes.SUB_FROM_CART:
        return subFromCart(id);

      case actionTypes.MUTATE_CART:
        return mutateCart(id, payload);

      case actionTypes.ONSAVE:
        return handleLike(id);

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
