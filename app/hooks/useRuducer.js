export const actionTypes = {
  INITIALIZE_CART: 'INITIALIZE_CART',
  INITIALIZE_SAVE: 'INITIALIZE_SAVE',
  ADD_TO_CART: 'ADD_TO_CART',
  SUB_FROM_CART: 'SUB_FROM_CART',
  MUTATE_CART: 'MUTATE_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  ONSAVE: 'ONSAVE',
  CLEAR_CART: 'CLEAR_CART',
  CLEAR_SAVE: 'CLEAR_SAVE',
};

const reducerFunction = (state, action) => {
  switch (action.type) {
    case actionTypes.INITIALIZE_CART:
      return {
        ...state,
        orderedItems: action.data,
      };

    case actionTypes.INITIALIZE_SAVE:
      return {
        ...state,
        savedItems: action.data,
      };

    case actionTypes.ADD_TO_CART:
      return {
        ...state,
        orderedItems: !state.orderedItems.some(
          elOrdered => elOrdered.productId === action.id,
        )
          ? [
              ...state.orderedItems,
              {
                productId: action.id,
                quantity: action.payload
                  ? elOrdered.quantity + parseInt(action.payload)
                  : elOrdered.quantity + 1,
              },
            ]
          : state.orderedItems.map(elOrdered =>
              elOrdered.productId === action.id
                ? {
                    ...elOrdered,
                    quantity: action.payload
                      ? elOrdered.quantity + parseInt(action.payload)
                      : elOrdered.quantity + 1,
                  }
                : elOrdered,
            ),
      };

    case actionTypes.SUB_FROM_CART:
      return {
        ...state,
        orderedItems: state.orderedItems.map(elOrdered =>
          elOrdered.productId === action.id
            ? {
                ...elOrdered,
                quantity:
                  elOrdered.quantity > 1
                    ? elOrdered.quantity - 1
                    : elOrdered.quantity,
              }
            : elOrdered,
        ),
      };

    case actionTypes.MUTATE_CART:
      return {
        ...state,
        orderedItems: state.orderedItems.map(elOrdered =>
          elOrdered.productId === action.id
            ? {
                ...elOrdered,
                quantity:
                  action.payload < 1
                    ? elOrdered.quantity
                    : parseInt(action.payload),
              }
            : elOrdered,
        ),
      };

    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        orderedItems: state.orderedItems.filter(
          elOrdered => elOrdered.productId !== action.id,
        ),
      };

    case actionTypes.ONSAVE:
      return {
        ...state,
        savedItems: state.savedItems.includes(action.id)
          ? state.savedItems.filter(productId => productId !== action.id)
          : [...state.savedItems, action.id],
      };

    case actionTypes.CLEAR_CART:
      return {
        ...state,
        orderedItems: [],
      };

    case actionTypes.CLEAR_SAVE:
      return {
        ...state,
        savedItems: [],
      };

    default:
      return state;
  }
};
// const reducerFunction = (state, action) => {
//   switch (action.type) {
//     case 'INITIALIZE':
//       return {
//         ...state,
//         cartsCount: action.data,
//       };

//     case 'addToCart':
//       return {
//         ...state,
//         cartsCount: state.cartsCount.map(elcounter =>
//           elcounter.productId === action.id
//             ? {
//                 ...elcounter,
//                 quantity: action.payload
//                   ? elcounter.quantity + parseInt(action.payload)
//                   : elcounter.quantity + 1,
//               }
//             : elcounter,
//         ),
//       };

//     case 'subFromCart':
//       return {
//         ...state,
//         cartsCount: state.cartsCount.map(elcounter =>
//           elcounter.productId === action.id
//             ? {
//                 ...elcounter,
//                 quantity:
//                   elcounter.quantity > 1
//                     ? elcounter.quantity - 1
//                     : elcounter.quantity,
//               }
//             : elcounter,
//         ),
//       };

//     case 'mutateCart':
//       return {
//         ...state,
//         cartsCount: state.cartsCount.map(elcounter =>
//           elcounter.productId === action.id
//             ? {
//                 ...elcounter,
//                 quantity:
//                   action.payload < 1
//                     ? elcounter.quantity
//                     : parseInt(action.payload),
//               }
//             : elcounter,
//         ),
//       };

//     case 'removeItem':
//       return {
//         ...state,
//         cartsCount: state.cartsCount.map(elcounter =>
//           elcounter.productId === action.id
//             ? {
//                 ...elcounter,
//                 quantity: 0,
//               }
//             : elcounter,
//         ),
//       };

//     case 'clearCart':
//       return {
//         ...state,
//         cartsCount: state.cartsCount.map(
//           elcounter =>
//             elcounter && {
//               ...elcounter,
//               quantity: 0,
//             },
//         ),
//       };

//     default:
//       return state;
//   }
// };

export default reducerFunction;
