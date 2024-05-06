import React, { createContext, useContext } from 'react';
import socketIO from 'socket.io-client';

const socket = socketIO.connect('https://chat-box-api-seven.vercel.app');
const ItemContext = createContext();
localStorage.debug = '*';
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
