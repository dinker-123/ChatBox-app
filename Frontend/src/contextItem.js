import React, { createContext, useContext } from 'react';
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:3000');
const ItemContext = createContext();

function useValue() {
  return useContext(ItemContext);
}

function CustomItemContext({ children }) {
  const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];
  return (
    <ItemContext.Provider value={{ user_list }}>
      {children}
    </ItemContext.Provider>
  );
}

export { useValue, CustomItemContext, socket };