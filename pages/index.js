import Head from 'next/head'
import Avatar from '../components/Home/Avatar'
import Wrapper from '../components/Wrapper'
import Content from '../components/Home/Content'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Head>
        <title>Alioth - 主页</title>
      </Head>
      <Wrapper>
        <Avatar />
        <Content />
        <Footer />
      </Wrapper>
    </div>
  )
}

export default Home
