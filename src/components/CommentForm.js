import { useState } from "react"

export function CommentForm({
  onSubmit,
  initialValue = "",
  index,
  comments,
  setComments,
  id,
  getFalseReply,
  getFalseEdit,
}) {
  const [message, setMessage] = useState(initialValue)

  function handleSubmit(event) {
    event.preventDefault()
    const copy = [...comments];
    const copy2 = updateList(copy, id, message)
    setComments(copy2);
    setMessage("")
    getFalseEdit(false)
  }


function updateList(array, id, newMessage) {
    return array
        .map((comment) => {
            if(comment.id == id)
            {
            comment.content = newMessage

            }
            if (!comment.children || !Array.isArray(comment.children)) 
            {   
                if(comment.id == id) comment.content = newMessage;
                return comment;}
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
    setComments(copy2);
    setMessage("");
    getFalseReply(false);
}


function updateComments(array, id, newReply) {

    return array
        .map((comment) => {
            if(comment.id == id)
            {
            comment.children.push(newReply)
            }
            if (!comment.children || !Array.isArray(comment.children)) 
            {   console.log('first return clause')
                if(comment.id == id) comment.children.push(newReply);
                return comment;}
            comment.children = updateComments(comment.children, id, newReply);
            return comment;
        });
}


  return (
    <form onSubmit= {onSubmit==='handleEdit'?handleSubmit:handleAddComment}>
      <div className="comment-form-row">
        <textarea
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
    </form>
  )
}