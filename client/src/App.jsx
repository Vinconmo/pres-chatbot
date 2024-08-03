import {useEffect, useState} from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Message from './Message'
import apiService from "./apiService";

function App() {
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([])

  // fetch all stored messages
  useEffect(() => {
    async function fetchMsgs () {
      const res = await apiService.getAll()
      setMessages(res)
    }
    fetchMsgs()
  }, [])

  // render list of messages
  const messageList = messages.map(message => {
    return (
      <Message key={message._id} timestamp={message.timestamp} content={message.content} authorId={message.authorId} />
    )
  })

  // form control
  function handleChange (event) {
    setMsg(event.target.value)
  }
  async function handleSubmit (event) {
    event.preventDefault()
    const tempMsg = {_id: uuidv4(), content: msg, authorId: true, timestamp: Date.now()};
    setMessages(prev => [...prev, tempMsg])
    setMsg('')
    const {user, model} = await apiService.postMsg(msg)
    const errorMsg = {content: 'An error occured, please try again later', timestamp: Date.now(), authorId: false}
    if (!user) {
      const filteredMsgs = messages.slice(0, 1)
      setMessages([filteredMsgs, errorMsg])
    } else {
      if (!model) {
        setMessages(prev => [...prev, errorMsg])
      } else {
        setMessages((prev) => [...prev, model]);
      }
    }
  }

  return (
    <>
      <div className="container">
        <div className="messages-container">{messageList}</div>
        <form id="msg-form" className="input-container" onSubmit={handleSubmit}>
          <input id="text" placeholder="Type a message" onChange={handleChange} value={msg}/>
          <input type="submit" value="SEND" className="send-button" />
        </form>
      </div>
    </>
  );
}

export default App;
