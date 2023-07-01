import React from 'react';
import './Chat.css';
import { Avatar } from '@mui/material';
import { IconButton } from '@mui/material';
import { AttachFile, MoreVert, SearchOutlined } from '@mui/icons-material';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { useState } from 'react';
import axios from "./axios";

const Chat = ({messages}) => {

    const [input, setInput] = useState("");

const sendMessage = async(e) => {
  e.preventDefault();
  await axios.post('/messages/new',{
    message:input,
    name:"DEMO APP",
    timestamp:"I am a demo 1234 timestamp 2.0",
    recieved: true
});
 setInput('')
};


  return (
    <div className='Chat'>
        <div className='Chat_header'>
        <Avatar/>
        <div className='Chat_headerInfo'>
            <h3>Room name</h3>
            <p>Last seen xyz</p>
        </div>
        <div className='Chat_headerRight'>
            <IconButton>
                <SearchOutlined/>
            </IconButton>
            <IconButton>
                <AttachFile/>
            </IconButton>
            <IconButton>
                <MoreVert/>
            </IconButton>
        </div>
        </div>
        <div className='Chat_body'>
             {messages.map((message) => (
             <p className={`chat_message ${message.recieved && "chat_receiver"}`}>
                <span className='chat_name'>{message.name}</span>
                        {message.message}
                <span className='timestamp'>{message.timestamp}</span>
            </p>
            ))}
        </div>


        <div className='Chat_footer'>
            <IconButton>
            <InsertEmoticonIcon/>
            </IconButton>
            <form onSubmit={messages}>
                <input value={input} onChange={ e =>setInput(e.target.value)} placeholder='type a message' type='text'/>
                <button onClick={sendMessage} type='submit'> send</button>
                
            </form>
            <IconButton>
            <MicIcon/>
            </IconButton>

        </div>
    </div>
  )
}

export default Chat