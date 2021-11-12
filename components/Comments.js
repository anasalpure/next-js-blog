import { useState } from "react"
import { fetchAPI } from "../lib/api"
import styles from '../styles/Blog.module.css'


export default function Comments({comments,ArticleId}) {
  const [page, setPage] = useState(0)
  const [data, setData] = useState(comments.data)
  const LoadMoreComments = async ()=>{
    comments = await fetchAPI(`/article/${ArticleId}/comments/${page+1}`,false);
    
    if(comments.data.length > 0){
      setData((data)=>[...data,...comments.data])
      setPage(page+1);
    }else{
      setPage(-1);
    }
  }


  return (
    <div className={styles.comments}>
        <h3>Comments</h3>
        {data.map((comment,i) =>
          <div className={styles.comment} key={comment.id}>
              <h5>
                {comment.username} &hearts; {comment.user_likes}
                <span>{comment.date_and_time}</span>
              </h5>
              
              <p>
                {comment.content}
              </p>
          </div>
        )}

        {page >= 0 ?
          <button  onClick = {LoadMoreComments}>Load More Comments</button>
          :
          <p>No more comments</p>
        }
    </div>
  )
}
