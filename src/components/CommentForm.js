import { useState } from "react"

export function CommentForm({
  loading,
  error,
  onSubmit,
  autoFocus = false,
  initialValue = "",
  index,
  comments,
  setComments,
  id,
}) {
  const [message, setMessage] = useState(initialValue)

  function handleSubmit(e) {
    e.preventDefault()
    //onSubmit(message).then(() => setMessage(""))
    //console.log('comment attempt')
    //update(index, message, comments, setComments)

    update2(id, message, comments, setComments)
    setMessage("")
  }

const update2 = (id, newMessage, comments, setComments) => {
    //console.log('attempting update')
    //console.log(message)
    //console.log(comment)
    const copy = [...comments];
    const copy2 = updateList(copy, id, newMessage)
    setComments(copy2);
}

function updateList(array, id, newMessage) {
    console.log('trying to update this')
    console.log(array);
    return array
        // .map(comment => {
        //     console.log('begin to render children')
        //     console.log(comment.children)
        //     if(comment.id == id)
        //     {console.log('first map in updateList')
        //     comment.content = newMessage
        //     console.log(newMessage)
        //     console.log(comment.children)
        //     console.log(array) }})
        .map((comment) => {
            if(comment.id == id)
            {console.log('first map in updateList')
            comment.content = newMessage
            console.log(newMessage)
            console.log(comment.children)
            console.log(array)}
            if (!comment.children || !Array.isArray(comment.children)) 
            {   console.log('first return clause')
                if(comment.id == id) comment.content = newMessage;
                return comment;}
            console.log('map2')
            comment.children = updateList(comment.children, id, newMessage);
            return comment;
        });
}

const update = (index, comment, comments, setComments) => {
    console.log('attempting update')
    //console.log(message)
    //console.log(comment)
    const copy = [...comments];
    console.log(copy)
    copy[index].content = comment;
    console.log('copy index content')
    setComments(copy);
}

  return (
    <form onSubmit={handleSubmit}>
      <div className="comment-form-row">
        <textarea
          //autoFocus={autoFocus}
          value={message}
          onChange={e => 
            {setMessage(e.target.value)
            console.log(e.target.value)}}
          className="message-input"
        />
        <button className="btn" type="submit">
          {"Post"}
        </button>
      </div>
      <div className="error-msg">{error}</div>
    </form>
  )
}