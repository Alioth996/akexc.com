import Wrapper from '../components/Wrapper'
import styles from '../styles/Project.module.css'
import Item from '../components/Project/Item'
import Head from 'next/head'
import Footer from '../components/Footer'

const Project = () => {
  return (
    <Wrapper>
      <Head>
        <title>My Projects</title>
      </Head>
      <div className={styles.container}>
        <p className={styles.title}>Projects</p>
        <div className={styles.list}>
          <Item
            name='Book-CMS'
            description='a web tts test with web native api'
            icon='&#xe61f;'
            repo='https://github.com/akex4396'
          />
        </div>
        <p className={styles.title}>Demo</p>
        <div className={styles.list}>
          <Item
            name='web-native-tts'
            description='a web tts test with web native api'
            icon='&#xe61f;'
            repo='https://github.com/akex4396'
          />
        </div>
      </div>
      <Footer />
    </Wrapper>
  )
}

export default Project
