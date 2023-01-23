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
}) {
  const [message, setMessage] = useState(initialValue)

  function handleSubmit(e) {
    e.preventDefault()
    //onSubmit(message).then(() => setMessage(""))
    console.log('comment attempt')
    update(index, message, comments, setComments)
    setMessage("")
    // const commentObject = {
    //     content: newComment,
    //     id: Math.random(),
    //     user: 'Userdefault'
    //   }
    //   counterComment+=1;
    //   setComments(comments.concat(commentObject))
    //   setNewComment('')
  }

  const update = (index, comment, comments, setComments) => {
    console.log('attempting update')
    console.log(message)
    const copy = [...comments];
    console.log(copy)
    copy[index].content = comment;
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