import { useState } from "react"
import { CommentForm } from "./CommentForm"


function myDeleteFunction(comment, comments, setComments) {
    console.log("in my function", comments)
    console.log("id", comment.id)
    let temp = []
    for (let i = 0; i < comments.length; i++) {
        if (comments[i].id !== comment.id) {
            console.log(comment.id)
            temp.push(comments[i])
        }
    }
// function checkRecursiveChildren() {
//  //check if comment
// //write a function where base case is no children
// //recursive is if child id == id...
// }
    console.log("temp", temp)
    setComments(temp)
    // return (
    //     <div>
    //     Hello World
    //   </div>
    // );
    console.log("after")
}

function updateLocalComment(id, message, setComments) {
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (comment.id === id) {
          return { ...comment, message }
        } else {
          return comment
        }
      })
    })
}



const deleteComment = (index, comment, comments, setComments) => {
    const copy = [...comments];
    console.log('winston')
    copy.splice(index, 1);
    setComments(copy);
}

// function handleSubmitComment(comment, comments, setComments) {
//     // toggle item's complete flag
//     const newComment = comment;
//     setComments
//   }


function recursiveRemove ( list, id, setComments ) {
    let temp = []
    return list.map ( item => { return {...item} }).filter ( item => {
        if ( 'children' in item ) {
            item.children = recursiveRemove ( item.children, id );
        }
        return item.id !== id;
    });
}

const AllComments = ({ index, comment , comments, setComments}) => {
    
    const [isEditing, setIsEditing] = useState(false)


    return(
        <div className="comment">
        <div className="header">
            <span className="name">{comment.user}</span>
        </div>
        <div className = "content">{comment.content}</div>
        <div className = "footer"> 
            <button>Reply</button> 
            <button onClick={() => setIsEditing(prev => !prev)}> Edit </button>
            <button onClick={() => deleteComment(index, comment, comments, setComments)}> Delete </button>
            <button onClick={() => myDeleteFunction(comment, comments, setComments)}> Delete2 </button>
            </div>
        {isEditing ? 
          <CommentForm
            // autoFocus
            initialValue={comment.content}
            //onSubmit={() => update(index, 'wisnton', comments, setComments)}
            onClick={() => setIsEditing(prev => !prev)}
            comments = {comments}
            index = {index}
            setComments = {setComments}
            // loading={updateCommentFn.loading}
            // error={updateCommentFn.error}
          />
        : <div></div>}
        <div>{comment.children?.map(comment =>
            <AllComments key= {comment.id} comment = {comment} comments = {comments} setComments = {setComments}/>)}
        </div>

        </div>
    )
}
//need to create a way to conditionally show edit/delete if the comment is not a root comment.
//onclick  
export default AllComments