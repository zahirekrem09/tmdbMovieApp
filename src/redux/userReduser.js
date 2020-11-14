/* eslint-disable prettier/prettier */
import {initialState} from './store';
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RETRIEVE_TOKEN':
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      };
    case 'LOGIN':
      return {
        ...state,
        userEmail: action.email,
        userToken: action.token,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        userEmail: null,
        userToken: null,
        isLoading: false,
      };
    case 'REGISTER':
      return {
        ...state,
        userEmail: action.email,
        userToken: action.token,
        isLoading: false,
      };
    case 'ADD_TO_FAVLIST':
      let list = [...state.wishList];
      if (!list.some((i) => i.title === action.payload.title)) {
        list.push(action.payload);
      }

      const newList = list.map((i) => {
        return {...i, category: action.category};
      });

      return {
        ...state,
        // favList: [action.payload, ...state.favList],
        wishList: newList,
      };

    case 'REMOVE_FROM_FAVLIST':
      return {
        ...state,
        wishList: state.wishList.filter(
          (item) => item.title !== action.payload.title,
        ),
      };

    case 'DARK_MOD':
      return {
        ...state,
        isDarkTheme: !state.isDarkTheme,
      };
    default:
      return {...state};
  }
};
