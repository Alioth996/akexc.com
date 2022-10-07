import styles from '../styles/Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p className={styles.cc}>
        <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/' rel='noreferrer' target='_blank'>
          CC BY-NC-SA 4.0
        </a>{' '}
        ©<a href='https://github.com/akex4396'>凌天(akex4396)</a>
      </p>
      <a href='https://beian.miit.gov.cn/' rel='noreferrer' target='_blank'>
        黔ICP备2021003687号-2
      </a>
    </div>
  )
}

export default Footer
