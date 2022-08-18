import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import './SidebarChat.css'
import { Avatar } from '@mui/material';
import db from './firebase'
import {
    addDoc, collection
} from 'firebase/firestore'

function SidebarChat(props) {
    const [seed, setSeed] = useState('');

    useEffect (() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [])

    const createChat = () => {
        const roomName = prompt("Please enter name for chat room");

        if(roomName) {
            //here it adds a new document to the db
            const colRef = collection(db, 'rooms');
            addDoc(colRef, {
                name: roomName,
            })
            .then(() => {
                console.log('succesful')
            })
        }
    }
  return !props.addNewChat ? (
      <Link to={`/rooms/${props.id}`}>
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidebarChat__info">
                <h2>{props.room.name}</h2>
                <p>Last message...</p>
            </div>
        </div>
      </Link>
  ) : (
      <div onClick={createChat} 
      className="sidebarChat">       
        <h2>Add new Chat</h2>
      </div>
  );
}

export default SidebarChat