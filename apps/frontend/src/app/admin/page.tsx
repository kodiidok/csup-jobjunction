'use client'

import styles from '@/app/page.module.css'
import FloorPlan from '@/components/floorPlan/floorPlan'
import Header from '@/components/header/headerAdmin'
import Rooms from '@/components/rooms/roomsAdmin'
import { ADMIN_APP_DESCRIPTION, ADMIN_APP_NAME } from '@/util/resourceNames'

export default function Home() {

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles['app-info-container']}>
            <h1 className={styles['app-name']}>{ADMIN_APP_NAME}</h1>
            <div className={styles['app-description']}>{ADMIN_APP_DESCRIPTION}</div>
          </div>
          <FloorPlan />
          <Rooms />
        </div>
      </main>
    </>
  )
}
