import { FC } from 'react'
import classNames from 'classnames'
import Icon from '@/shared/assets/icons/Layer 15.svg'

import styles from './about.module.scss'
import { AboutProps } from './about.types'
import { AboutContent } from '@/components/aboutContent'

const About: FC<AboutProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <div className={styles.firstline}>
        <div className={styles.title}><Icon className={styles.icon} />о нас</div>
        <AboutContent  className={styles.gradient1} title='Опыт и профессионализм.' description='
  Наша команда состоит из опытных специалистов, которые уже много лет работают в сфере создания сайтов. Мы знаем все тонкости и нюансы этого процесса, что позволяет нам создавать качественные и эффективные сайты для наших клиентов. '/>
        <AboutContent className={styles.gradient2} title='Индивидуальный подход.' description='
  Мы понимаем, что каждый клиент уникален, поэтому мы разрабатываем индивидуальные решения для каждого проекта. Мы учитываем все ваши требования и пожелания, чтобы создать сайт, который будет соответствовать вашим целям и задачам. ' />
      </div>
      <div className={styles.secondline}>
        <AboutContent className={styles.gradient3} title='Гарантия качества.' description='
  Мы уверены в качестве своих услуг и предоставляем гарантию на все наши работы. Если у вас возникнут какие-либо проблемы с сайтом после его запуска, мы всегда готовы помочь вам их решить. '/>
        <AboutContent className={styles.gradient4} title='Использование современных технологий.' description='
  Мы следим за последними тенденциями в области создания сайтов и используем только самые современные технологии и инструменты. Это позволяет нам создавать сайты, которые будут выглядеть современно и привлекательно. '/>
      </div>
    </div>
  )
}

export default About
