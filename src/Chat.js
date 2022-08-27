import React, {useEffect, useState} from 'react'
import './Chat.css'
import { useParams } from 'react-router-dom'
import { Avatar,IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { 
    collection, onSnapshot, setDoc, doc, serverTimestamp, updateDoc, addDoc
  } from 'firebase/firestore'
  import db from './firebase'
  import {
    useUser
} from './UserContext'

function Chat({rooms}) {
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const {roomId} = useParams();
    const [room, setRoom] = useState('');
    const [index, setIndex] = useState(0);
    const [dataReady, setDataReady] = useState(false);
    const [messages, setMessages] = useState([])
    const user = useUser();

    useEffect (() => {
        getMessages();
        setReady();
        //roomIndexFinder();
        //getMessages();
        console.log('This is user:', user)
    }, [])

    useEffect (() => {
        getMessages();
        setReady();
        //roomIndexFinder();
        //getMessages();
    }, [roomId])

    useEffect (() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [])

    const setReady = () => {
        if(messages)
             setDataReady(true);
    }

    const sendMessage = (e) => {
        e.preventDefault();
        const subCollectionRef = collection(db, 'rooms', roomId, 'messages');
        const data = {
            message: input,
            name: user.displayName,
            timestamp: serverTimestamp()
        }
        addDoc(subCollectionRef, data)
        .then(() => {
            console.log('succesful')
        })
        setInput('');
    }
    const getMessages = () => {
        const colRef = collection(db, 'rooms', `${roomId ? roomId : rooms[0].id}`, 'messages');
        onSnapshot(colRef, (snapshot) => {
            let messagesCopy = [];
            snapshot.docs.forEach((doc) => {
                messagesCopy.push({...doc.data()})
                messagesCopy.sort((a,b) => {return a.timestamp-b.timestamp;});
            })
            //messagesCopy.sort((a,b) => {return a.timestamp-b.timestamp;});
            setMessages(messagesCopy)
            setDataReady(true);
        })
    }
  return (
    <div className="chat">
        <div className="chat__header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="chat__headerInfo">
                <h3>{rooms[rooms.findIndex((room) => room.id === roomId)].name || rooms[0].name}</h3>
                <p>Last seen at ...</p>
            </div>
            <div className="chat__headerRight">
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <IconButton>
                    <AttachFileIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </div>
        </div>
        <div className="chat__body">
            {dataReady ? messages?.map((message) => {
                return <p className={`chat__message ${true && 'chat__receiver'} `}>
                    <span className="chat__name">
                    {message.name}
                </span>
                    {message.message}
                    <span className="chat__timestamp"><br></br>
                        {new Date(message?.timestamp?.toDate()).toUTCString()}
                </span>
                    </p>
                    
            }) : <p>loading...</p>}
        </div>
        <div className="chat__footer">
        <IconButton>
            <InsertEmoticonIcon/>
        </IconButton>
        <form>
            <input value={input} onChange={(e) => {setInput(e.target.value)}} type="text" placeholder="Type a message"></input>
            <button onClick={sendMessage} type="submit">Send a message</button>
        </form>
        <IconButton>
            <MicIcon/>
        </IconButton>
        </div>
    </div>
  )
}

export default Chat