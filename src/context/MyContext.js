import React from "react";

const initialState = {
   currentAddress: "",
};

const actions = {
   LOGIN_METAMASK: "LOGIN_METAMASK",
};

const reducer = (state, action) => {
   const { type, payload } = action;
   switch (type) {
      case actions.LOGIN_METAMASK:
         return {
            ...state,
            currentAddress: payload,
         };
   }
};

export const AddressContext = React.createContext();

const Provider = ({ children }) => {
   const [state, dispatch] = React.useReducer(reducer, initialState);

   const value = {
      currentAddress: state.currentAddress,
      loginMetaMask: (address) => {
         dispatch({ type: actions.LOGIN_METAMASK, payload: address });
      },
   };
   return (
      <AddressContext.Provider value={value}>
         {children}
      </AddressContext.Provider>
   );
};
export default Provider;
