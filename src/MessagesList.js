import * as React from 'react';

export const MessagesList = ({messagesList}) => {
  return (
    messagesList.map(message => {
      return (<p key={message.id}>{message.message}</p>)
    })
  )
}
MessagesList.whyDidYouRender = true
