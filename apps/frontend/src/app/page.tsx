'use client'

import styles from '@/app/page.module.css'
import Tags from '@/components/filters/tags'
import FloorPlan from '@/components/floorPlan/floorPlan'
import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'
import Rooms from '@/components/rooms/rooms'
import { APP_DESCRIPTION, APP_NAME } from '@/util/resourceNames'

export default function Home() {

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles['app-info-container']}>
            <h1 className={styles['app-name']}>{APP_NAME}</h1>
            <div className={styles['app-description']}>{APP_DESCRIPTION}</div>
          </div>
          <FloorPlan />
          <Tags />
          <Rooms />
        </div>
      </main>
      <Footer />
    </>
  )
}
