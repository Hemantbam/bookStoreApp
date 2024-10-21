import React, { useState } from "react";
import { CartContext, userEmailContext } from "./context";

export const CartContextProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    return (
        <CartContext.Provider value={{ books, setBooks }}>
            {children}
        </CartContext.Provider>
    );
}

export const UserEmailProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <userEmailContext.Provider value={{ email, setEmail, password, setPassword }}>
            {children}
        </userEmailContext.Provider>
    );
};
