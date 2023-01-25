import { useState } from "react"
import { CommentForm } from "./CommentForm"



const deleteComment2 = (index, comment, comments, setComments) => {
    const copy = [...comments];
    const copy2 = removeFromList(copy, comment.id);
    setComments(copy2);
}

function removeFromList(array, id) {
    return array
        .filter(comment => comment.id !== id)
        .map((comment) => {
            if (!comment.children || !Array.isArray(comment.children)) return comment;
            comment.children = removeFromList(comment.children, id);
            return comment;
        });
}


const AllComments = ({ index, comment , comments, setComments}) => {
    
    const [isEditing, setIsEditing] = useState(false)
    const [isReplying, setIsReplying] = useState(false)



    return(
        <div className="comment">
        <div className="header">
            <span className="name">{comment.user}</span>
        </div>
        <div className = "content">{comment.content}</div>
        <div className = "footer"> 
            <button onClick={() => setIsReplying(prev => !prev)}>Reply</button> 
            <button onClick={() => setIsEditing(prev => !prev)}> Edit </button>
            <button onClick={() => deleteComment2(index, comment, comments, setComments)}> Delete </button>
            </div>
        {isReplying ? 
          <CommentForm
            initialValue={comment.content}
            //onClick={() => setIsReplying(false)}
            comments = {comments}
            index = {index}
            setComments = {setComments}
            id = {comment.id}
            onSubmit = {'handleReply'}
            setisReplying = {setIsReplying}
          />
        : <div></div>}
        {isEditing ? 
          <CommentForm
            initialValue={comment.content}
            onClick={() => setIsEditing(false)}
            comments = {comments}
            index = {index}
            setComments = {setComments}
            id = {comment.id}
            onSubmit = {'handleEdit'}
            setIsEditing = {setIsEditing}
          />
        : <div></div>}
        <div>{comment.children?.map(comment =>
            <AllComments key= {comment.id} comment = {comment} comments = {comments} setComments = {setComments}/>)}
        </div>

        </div>
    )
}

export default AllComments