import React from 'react';
import { CustomItemContext } from './contextItem';
import Chatbox from './component/chatbox/chatbox';

function App() {
  return (
    <CustomItemContext>
      <Chatbox />
    </CustomItemContext>
  );
}

export default App;
