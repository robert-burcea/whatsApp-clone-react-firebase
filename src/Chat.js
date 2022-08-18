import React, {useEffect, useState} from 'react'
import './Chat.css'
import { useParams } from 'react-router-dom'
import { Avatar,IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';

function Chat() {
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");

    useEffect (() => {
        if(roomId) {
            //LEFT HERE
        }
    }, [roomId])

    useEffect (() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [])

    const sendMessage = (e) => {
        e.preventDefault();
        prompt(JSON.stringify({input}))
        setInput('');
    }
  return (
    <div className="chat">
        <div className="chat__header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="chat__headerInfo">
                <h3>Room name</h3>
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
            <p className={`chat__message ${true && 'chat__receiver'} `}>
            <span className="chat__name">
                Robert
            </span>
                Hello
            <span className="chat__timestamp">
                3:52pm
            </span>
            </p>

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