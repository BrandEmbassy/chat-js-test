import { MessagesList } from './MessagesList';
import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import socketClient from 'socket.io-client';
import * as uuid from 'uuid';
import whyDidYouRender from '@welldone-software/why-did-you-render'

whyDidYouRender(React, {
  trackAllPureComponents: true,
});

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
const defaultMessages = []
for (let i = 0; i < 10; i++) {
  defaultMessages.push({
    id: uuid.v4(),
    userName: 'John Doe',
    message: `message ${i}`
  })
}
function App() {
  const classes = useStyles();
  const [message, setMessage] = React.useState('')
  const [userName, setUserName] = React.useState('')
  const [messagesList, setMessageList] = React.useState(defaultMessages)
  useEffect(() => {
    client.on('chat', (id, userName, message) => {
      setMessageList((messageList) => [...messageList, {id, userName, message}])
    })
  }, [])
  const handleMessageChange = (e) => {
    setMessage(e.target.value)
  }
  const handleUsernameChange = (e) => {
    setUserName(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    client.emit('chat', uuid.v4(), userName, message)
    setMessage('')
  }
  return (
    <div className="App">
      <TextField fullWidth label="Enter your username" onChange={handleUsernameChange}/>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField fullWidth value={message} label="Enter your message and press [ENTER]" onChange={handleMessageChange}/>
      </form>
      <div>
        <MessagesList messagesList={messagesList} />
      </div>
    </div>
  );
}
export default App;
