import style from './style.module.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus,faHashtag } from '@fortawesome/free-solid-svg-icons'; 
import {useValue} from '../../contextItem';
import image from '../image/boy.png';


function Bar (){
    const { user_list, selectedUser } = useValue();
    return(
      <div className={style.chatContainer}>
      <div className={style.userName}>
        {/* Add an img tag for the avatar with a random image */}
        <img src={image} alt="Avatar" className={style.avatar} />
        <p><b>{selectedUser}</b></p>
      </div>


            <div className={style.conversation}>
                <div className={style.conversationHeader}>
                    <p>Conversation</p>
                    <FontAwesomeIcon icon={faCirclePlus} />
                </div>

                {user_list.map(user => (
  <div
    key={user}
    className={`${style.location} ${selectedUser === user ? style.activeLocation : ''}`}
  >
    <FontAwesomeIcon icon={faHashtag} className={style.icon} />
    {user}
  </div>
))}

      </div>
    </div>
  );
}

export default Bar;
