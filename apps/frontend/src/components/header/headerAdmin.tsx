'use client'

import styles from '@/app/page.module.css'
import { Image } from '@mantine/core'
import { ADMIN_APP_NAME, FACULTY_NAME, UNIVERSITY_NAME } from '@/util/resourceNames'

export default function Header() {

  return (
    <div className={styles.header}>
      <div className={styles.facultyHeader}>
        <Image src='uop_logo.png' width={40} />
        <div>
          <h4>{FACULTY_NAME}</h4>
          <h6>{UNIVERSITY_NAME}</h6>
        </div>
      </div>
    </div>
  )
}
