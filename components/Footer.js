import styles from '../styles/Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p className={styles.cc}>
        Power by ©
        <a href='https://www.nextjs.cn/'>
          {' '}
          <span className={styles.textLink}>Next.js</span>{' '}
        </a>
      </p>
      <p className={styles.cc}>
        <a
          href='https://creativecommons.org/licenses/by-nc-sa/4.0/'
          rel='noreferrer'
          target='_blank'
          className={styles.textLink}
        >
          CC BY-NC-SA 4.0
        </a>
        &nbsp; © &nbsp;
        <a href='https://github.com/alioth996' className={styles.textLink}>
          凌天(akex4396)
        </a>
      </p>
      <a href='https://beian.miit.gov.cn/' rel='noreferrer' target='_blank' className={styles.textLink}>
        黔ICP备2021003687号-2
      </a>
    </div>
  )
}

export default Footer
