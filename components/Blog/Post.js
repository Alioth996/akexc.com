import styles from '../../styles/Post.module.css'
import Link from 'next/link'

const Post = ({ title, date, id }) => {
  return (
    <Link href={`/blog/${id}`}>
      <div className={styles.post}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.date}>{date}</p>
      </div>
    </Link>
  )
}

export default Post
