'use client'

import styles from '@/app/page.module.css'
import Header from '@/components/header/header'
import StallsContainer from '@/components/stalls/stallsContainer'
import { APP_NAME } from '@/util/resourceNames'

export default function Home() {

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.appName}>{APP_NAME}</h1>
          <StallsContainer stalls={[]}/>
        </div>
      </main>
    </>
  )
}
