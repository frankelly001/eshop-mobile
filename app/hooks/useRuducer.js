const reducerFunction = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        ...state,
        cartsCount: action.data,
      };

    case 'addToCart':
      return {
        ...state,
        cartsCount: state.cartsCount.map(elcounter =>
          elcounter.productId === action.id
            ? {
                ...elcounter,
                quantity: action.payload
                  ? elcounter.quantity + parseInt(action.payload)
                  : elcounter.quantity + 1,
              }
            : elcounter,
        ),
      };

    case 'subFromCart':
      return {
        ...state,
        cartsCount: state.cartsCount.map(elcounter =>
          elcounter.productId === action.id
            ? {
                ...elcounter,
                quantity:
                  elcounter.quantity > 1
                    ? elcounter.quantity - 1
                    : elcounter.quantity,
              }
            : elcounter,
        ),
      };

    case 'mutateCart':
      return {
        ...state,
        cartsCount: state.cartsCount.map(elcounter =>
          elcounter.productId === action.id
            ? {
                ...elcounter,
                quantity:
                  action.payload < 1
                    ? elcounter.quantity
                    : parseInt(action.payload),
              }
            : elcounter,
        ),
      };

    case 'removeItem':
      return {
        ...state,
        cartsCount: state.cartsCount.map(elcounter =>
          elcounter.productId === action.id
            ? {
                ...elcounter,
                quantity: 0,
              }
            : elcounter,
        ),
      };

    case 'clearCart':
      return {
        ...state,
        cartsCount: state.cartsCount.map(
          elcounter =>
            elcounter && {
              ...elcounter,
              quantity: 0,
            },
        ),
      };

    default:
      return state;
  }
};

export default reducerFunction;
