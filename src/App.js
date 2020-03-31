import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import socketClient from 'socket.io-client';
import * as uuid from 'uuid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));


const client = socketClient('localhost:4444')

function App() {
  const classes = useStyles();
  const [message, setMessage] = React.useState('')
  const [userName, setUserName] = React.useState('')
  const [messageList, setMessageList] = React.useState([])
  
  useEffect(() => {
    client.on('chat', (id, userName, message) => {
      setMessageList((messageList) => [...messageList, {id, userName, message}])
    })
  }, [])

  const handleMessageChange = (e) => {
    setMessage(e.target.value)
  }

  const handleUsernameChange = (e) => {
    setUserName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    client.emit('chat', uuid.v4(), userName, message)
    setMessage('')
  }

  return (
    <div className="App">
    	<div id="controlBox">    	      
    	  	<TextField fullWidth placeholder="Enter your username" onChange={handleUsernameChange}/>
	      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
	        <TextField id="writeMessage" value={message} placeholder="Enter your message and press [ENTER]"  onChange={handleMessageChange}/>
	      </form>
	      <div id="toolBox">
	      	<div className="rooms button"></div>
	      	<div className="status button"></div>
	      	<div className="settings button"></div>
	      </div>
    	</div>
        <div id="messages">
          {messageList.map(({id, userName, message}) => 
            <div key={id} className="messageBlock">
              <div className="userName">{userName}</div>
              <div className="message">{message}</div>
              <img className="avatar" alt="" src="/img/avatars/5.png" />
            </div>
          )}
        </div>
    </div>
  );
}

export default App;
