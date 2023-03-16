import utilStyles from '../../styles/util.module.css'
import styls from '../../styles/Content.module.css'
import Divider from '../Divider'
import Link from 'next/link'

const Content = () => {
  return (
    <div className={`${styls.content} ${utilStyles.plain}`}>
      <article>
        <p>Hi,I am Alioth. Welcome to my blog. </p>
        <p>My hobbies</p>
        <ul>
          <li>喜欢编程</li>
          <li>喜欢民乐</li>
          <li>喜欢健身</li>
          <li>耍点笛箫</li>
        </ul>
      </article>
      <Divider />
      <article>
        <p> Find me</p>
        <ul>
          <li>
            <a href='https://github.com/akex4396' rel='noreferrer' target='_blank' className={utilStyles.textLink}>
              Github
            </a>
          </li>
          <li>
            <a
              href='https://space.bilibili.com/188042974'
              rel='noreferrer'
              target='_blank'
              className={utilStyles.textLink}
            >
              Bilibili
            </a>
          </li>

          <li>
            <a
              href='https://juejin.cn/user/2494123366949895'
              rel='noreferrer'
              target='_blank'
              className={utilStyles.textLink}
            >
              掘金
            </a>
          </li>

          <li>
            <a href='mailto:2844520415@qq.com' rel='noreferrer' target='_blank' className={utilStyles.textLink}>
              E-mail
            </a>
          </li>
        </ul>
      </article>
    </div>
  )
}

export default Content
