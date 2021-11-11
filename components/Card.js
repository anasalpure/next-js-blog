import Link from 'next/link'
import styles from '../styles/Blog.module.css'

const Card = ({ title, description, href }) => (

  <Link href={href}>
      <a className={styles.card} >
        <h2>{title}</h2>
        <p>
          {description}
        </p>
      </a>
  </Link>

)

export default Card
