import ReactDOM from 'react-dom/client'
import App from './App'
import "./styles.css"


const comments = [
  {
    id: 1,
    content: 'Comment 1',
    user: 'User1',
    children: [{
      id: 31,
      content: 'CHILDREN!!!!!',
      user: 'User1',
      children: [{
        id: 35,
        content: 'GrandCHILDREN!!!!!',
        user: 'User1',
        children: [],
      }]
    }]
  },
  {
    id: 2,
    content: 'Comment 2',
    user: 'User2',
    children: [],

  },
  {
    id: 3,
    content: 'Comment 3',
    user: 'User3',
    children: [],

  }
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <App comments={comments} />
)


