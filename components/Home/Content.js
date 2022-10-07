import utilStyles from '../../styles/util.module.css'
import styls from '../../styles/Content.module.css'
import Divider from '../Divider'
import Link from 'next/link'

const Content = () => {
  return (
    <div className={`${styls.content} ${utilStyles.plain}`}>
      <article>
        <p>Hi,welcome to my blog. I am 凌天, also akex4396</p>
        <p>Anyway my hobbies:</p>
        <ul>
          <li>喜欢编程</li>
          <li>喜欢民乐</li>
          <li>喜欢健身</li>
          <li>耍点笛箫</li>
        </ul>
      </article>
      <Divider />
      <article>
        <p>
          Find me on{' '}
          <a href='https://github.com/kelvinqiu802' rel='noreferrer' target='_blank' className={utilStyles.textLink}>
            Github
          </a>{' '}
          and{' '}
          <a
            href='https://space.bilibili.com/38563775'
            rel='noreferrer'
            target='_blank'
            className={utilStyles.textLink}
          >
            哔哩哔哩
          </a>
          .
        </p>
        <p>
          <a href='mailto:2844520415@qq.com' rel='noreferrer' target='_blank' className={utilStyles.textLink}>
            Send mail to me
          </a>
        </p>
      </article>
    </div>
  )
}

export default Content
