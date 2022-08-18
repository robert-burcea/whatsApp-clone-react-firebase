import React, {useState, useEffect} from 'react';
import './Sidebar.css'
import { Avatar, IconButton } from '@mui/material';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from './SidebarChat'
import db from './firebase'
import { 
    collection, onSnapshot
  } from 'firebase/firestore'

function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [updated, setUpdated] = useState(false);
   
        //fetch the rooms collection from db, real time collection data
      const dataFetch = () => {
        
        const colRef = collection(db, 'rooms')
        //getting the data once
        /*getDocs(colRef)
            .then((snapshot) => {
                 let rooms = [];
                snapshot.docs.forEach((doc) => {
                rooms.push({...doc.data(), id:doc.id})
            })
            console.log(rooms);
            setRooms(rooms);
            })
            .catch(err => {
                console.log(err.message)
            })*/

        onSnapshot(colRef, (snapshot) => {
            let rooms = [];
            snapshot.docs.forEach((doc) => {
                rooms.push({...doc.data(), id:doc.id})
            })
            console.log(rooms);
            setRooms(rooms);
        })
      }

    useEffect(() => {
        dataFetch();
    },[])
    useEffect(() => {
        dataFetch();
    },[updated])

  return (
    <div className="sidebar">
        <div className="sidebar__header">
            <Avatar />
            <div className="sidebar__headerRight">
                <IconButton>
                    <DonutLargeIcon />
                </IconButton>
                <IconButton>
                    <ChatIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </div>
        </div>
        <div className="sidebar__search">
            <div className="sidebar__searchContainer">
                <SearchIcon />
                <input type="text" placeholder="Search or start new chat"></input> 
            </div>

        </div>
        <div className="sidebar__chats">
            <SidebarChat addNewChat />
            {rooms.map((room) => {
                return <SidebarChat key={room.id} room={room} id={room.id}/>
            })}
        </div>
    </div>
  )
}

export default Sidebar