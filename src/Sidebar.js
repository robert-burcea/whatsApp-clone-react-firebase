import React, {useState, useEffect} from 'react';
import './Sidebar.css'
import { Avatar, IconButton } from '@mui/material';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from './SidebarChat'
import {
    useUser
} from './UserContext'


function Sidebar({rooms}) {
    const user = useUser();

   return (
    <div className="sidebar">
        <div className="sidebar__header">
            <Avatar src={user?.photoURL} alt={user?.displayName}/>
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