import Link from 'next/link'
import styles from '../styles/Blog.module.css'

const Card = ({ title, description, clapsCount, commentsCount, href }) => (

  <Link href={href}>
      <a className={styles.card} >
        <h2>{title}</h2>
        <p>
          {description}
        </p>
        <div>
        claps &hearts; : {clapsCount} <br/>
        comments : {commentsCount}
        </div>
      </a>
  </Link>

)

export default Card
