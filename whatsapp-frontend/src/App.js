import './App.css';
import Sidebar from './Sidebar.js';
import Chat from './Chat.js';
import Pusher from "pusher-js";
import { useEffect,useState } from 'react';
import axios from './axios';

function App() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
        setMessages(response.data);
      })
  }, [])


  useEffect(() => {
    const pusher = new Pusher('58a0727ae70879c7c79c', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      setMessages([...messages , newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }

  }, [messages]); 

  
  console.log(messages);
  return (
    <div className="App">
      <div className='AppBody'>
        <Sidebar/>
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;

