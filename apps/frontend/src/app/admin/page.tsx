'use client'

import styles from '@/app/page.module.css'
import Companies from '@/components/companies/companies'
import FloorPlan from '@/components/floorPlan/floorPlan'
import Header from '@/components/header/headerAdmin'
import Rooms from '@/components/rooms/roomsAdmin'
import Students from '@/components/students/students'
import { APP_NAME } from '@/util/resourceNames'

export default function Home() {

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {/* <h1 className={styles['app-name']}>{APP_NAME}</h1> */}
          <FloorPlan />
          <Rooms />
        </div>
      </main>
    </>
  )
}
