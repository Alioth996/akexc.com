import styles from '../../styles/Avatar.module.css'
import React from 'react'
import Image from 'next/image'

const Avatar = () => {
  const [index, setIndex] = React.useState(0)
  const ref = React.useRef()
  const words = ['天连碧水碧连天', '映日荷花别样红']

  setTimeout(() => {
    if (ref.current) {
      ref.current.classList.add(styles.out)
    }
  }, 2900)
  const aboutMe = 'Not a Front-End Developer but a Front-End Buger'
  const handleEnd = () => {
    ref.current.classList.remove(styles.out)
    setIndex(prev => (prev + 1 === words.length ? 0 : prev + 1))
  }

  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <h1 className={styles.name} ref={ref} onTransitionEnd={handleEnd}>
          {words[index]}
        </h1>
        <p className={styles.tag}>{aboutMe.toUpperCase()}</p>
      </div>
    </div>
  )
}

export default Avatar
