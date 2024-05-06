import React, { useState, useEffect, useRef } from 'react';
import style from '../chatbox/style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faPaperPlane, faHeart, faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { socket } from '../../contextItem';
import Bar from '../bar/bar';
import Picker from 'emoji-picker-react';

const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

function Chatbox() {
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [input, setInput] = useState('');
  const chatBoxRef = useRef(null);
  const [showBar, setShowBar] = useState(false);
  const currentUser = "YourUsername";

  // Function to toggle the Bar component
  const toggleBar = () => {
    setShowBar(prevShowBar => {
      const root = document.documentElement;
      root.style.setProperty('--show-bar', prevShowBar ? '0' : '1');
      return !prevShowBar;
    });
  };

  const onEmojiClick = (emojiObject) => {
    setInput(prevInput => prevInput + emojiObject.emoji);
    setShowEmojiPicker(false);
  };
  
  

  const sendMessage = () => {
    const username = user_list[Math.floor(Math.random() * user_list.length)];
    const newMessage = { username, text: input, likes: 0 };
    if (input.trim().length === 0) {
      alert('Message is empty');
      return;
    }
    socket.emit('message', newMessage);
    setInput('');
  };

  useEffect(() => {
    const handleMessageReceive = (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    };

    const handleLikeUpdate = (data) => {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        newMessages[data.index].likes = data.likes;
        return newMessages;
      });
    };

    socket.on('updateLikeCount', handleLikeUpdate);
    socket.on('receiveMessage', handleMessageReceive);

    return () => {
      socket.off('receiveMessage', handleMessageReceive);
      socket.off('updateLikeCount', handleLikeUpdate);
    };
  }, []);

  const likeMessage = index => {
    const newMessages = [...messages];
    newMessages[index].likes += 1;
    setMessages(newMessages);
    socket.emit('likeMessage', { index, likes: newMessages[index].likes });
  };

  return (
    <div className={style.chatContainer}>
      <div className={showBar ? style.showBar : ''}>
        {showBar && <Bar />}
        <div className={style.chatboxContainer}>
          {/* Top chatbox */}
          <div className={style.chatTop}>
            <p><b>{messages.length > 0 ? messages[messages.length - 1].username : 'No User'}</b><br />
            This Channel is For Company Wide Chatter</p>
            <p className={style.member} onClick={toggleBar}>
              {user_list.length} / 100 <FontAwesomeIcon icon={faUserGroup} />
            </p>
          </div>
          <div className={style.chatBox} ref={chatBoxRef}>
            {messages.map((message, index) => (
              <div key={index} className={message.username === currentUser ? style.messageBoxRight : style.messageBoxLeft}>
                <strong>{message.username}</strong>: <span className={style.messageText}>{message.text}</span>
                <button onClick={() => likeMessage(index)} className={style.likeButton}><FontAwesomeIcon icon={faHeart} /></button>
                <span>{message.likes}</span>
              </div>
            ))}
          </div>
          <div className={style.inputChat}>
            <div className={style.emojiInputContainer}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                className={style.inputField}
                placeholder="Type a message"
              />
              <FontAwesomeIcon icon={faFaceSmile} onClick={() => setShowEmojiPicker(prevState => !prevState)} />
              {showEmojiPicker && <Picker onEmojiClick={onEmojiClick} className={style.emojiPicker} />}
            </div>
            <button onClick={sendMessage} className={style.sendIcon}>
              <FontAwesomeIcon icon={faPaperPlane}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbox;

