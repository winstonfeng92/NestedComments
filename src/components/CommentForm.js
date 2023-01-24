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

    //update2(id, message, comments, setComments)
    const copy = [...comments];
    const copy2 = updateList(copy, id, message)
    setComments(copy2);
    setMessage("")
  }



function updateList(array, id, newMessage) {
    console.log('trying to update this')
    console.log(array);
    return array
        .map((comment) => {
            if(comment.id == id)
            {console.log('first map in updateList')
            comment.content = newMessage

            }
            if (!comment.children || !Array.isArray(comment.children)) 
            {   console.log('first return clause')
                if(comment.id == id) comment.content = newMessage;
                return comment;}
            console.log('map2')
            comment.children = updateList(comment.children, id, newMessage);
            return comment;
        });
}

const handleAddComment = (event) => {
    event.preventDefault()
    const commentObject = {
    id: Math.random(),
    content: message,
      user: 'Userdefault',
      children: [],
    }
    const copy = [...comments];
    const copy2 = updateComments(copy, id, commentObject)
    console.log("end of handler")
    console.log(copy2)
    setComments(copy2);
    setMessage("")
}

function updateComments(array, id, newReply) {
    console.log('trying to update this')
    console.log(array);
    return array
        .map((comment) => {
            if(comment.id == id)
            {console.log('first map in updateList')
            comment.children.push(newReply)

            }
            if (!comment.children || !Array.isArray(comment.children)) 
            {   console.log('first return clause')
                if(comment.id == id) comment.children.push(newReply);
                return comment;}
            console.log('map2')
            comment.children = updateList(comment.children, id, newReply);
            return comment;
        });
}



const update2 = (id, newMessage, comments, setComments) => {
        //console.log('attempting update')
        //console.log(message)
        //console.log(comment)
        const copy = [...comments];
        const copy2 = updateList(copy, id, newMessage)
        setComments(copy2);
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
    <form onSubmit= {onSubmit==='handleEdit'?handleSubmit:handleAddComment}>
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
          {onSubmit==='handleEdit'?"Edit":"Reply"}
        </button>
      </div>
      <div className="error-msg">{error}</div>
    </form>
  )
}