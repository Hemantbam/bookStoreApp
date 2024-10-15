import React, { useState } from "react";
import CartContext from "./CartContext";

const CartContextProvider = ({ children }) => {
    const [books, setBooks]= useState([])
    return (
        <>
        <CartContext.Provider value={{books, setBooks}}>
        {children}
        </CartContext.Provider>
        </>
    )
}

export default CartContextProvider