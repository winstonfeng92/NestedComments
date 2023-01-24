import { useState } from 'react'
import AllComments from './components/AllComments'

const App = (props) => {
  
  const [comments, setComments] = useState(props.comments)
  const [newComment, setNewComment] = useState(
    'a new comment...'
  ) 
  const addComment = (event) => {
    event.preventDefault()
    const commentObject = {
      content: newComment,
      id: Math.random(),
      user: 'Userdefault'
    }
    setComments(comments.concat(commentObject))
    setNewComment('')
  }

  const handleCommentChange = (event) => {
    console.log(event.target.value)
    setNewComment(event.target.value)
  }

  return (
    <div>
    <h1>Comments</h1>

    <div>
        {comments.map((comment,i) =>
        <AllComments key={comment.id} index={i} comment={comment} comments={comments} setComments={setComments}/>
        )}
    </div>
    <li></li>
    <form onSubmit={addComment}>
        <input 
        value = {newComment}
        onChange = {handleCommentChange}/>
        <button type="submit">save</button>
      </form>
  </div>
  );
}

export default App;
