import React from 'react';
import './SidebarChats.css';
import { Avatar } from '@mui/material';

function SidebarChats ({addNewChat}) {

    const createChat =() => {
        const roomName=prompt("Please enter name of chat");
        if (roomName){
            // do some database stuff
        }

    };

  return !addNewChat ? (
    <div className='sidebarChats'>
    <Avatar />
    <div className='sidebarChats_info'>
        <h2>Room name</h2>
        <p>last message...</p>
    </div>

    </div>
  ):(
    <div onClick={createChat} className='sidebarChats'>
        <h2>Add new chat </h2>
    </div>
  );
}

export default SidebarChats