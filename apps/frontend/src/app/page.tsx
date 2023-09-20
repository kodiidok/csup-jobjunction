'use client'

import styles from '@/app/page.module.css'
import Tags from '@/components/filters/tags'
import FloorPlan from '@/components/floorPlan/floorPlan'
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
      <div className={styles['footer']}>
        <div className={styles['footer-item']}>
          <h3>Address</h3>
          <p>Science Industry Interaction Cell, Faculty of Science, University of Peradeniya.</p>
        </div>
        <div className={styles['footer-item']}>
          <h3>Email</h3>
          <p>siic@pdn.ac.lk / info.siic@sci.pdn.ac.lk</p>
        </div>
        <div className={styles['footer-item']}>
          <h3>Phone</h3>
          <p>(+94) 81 238 9152</p>
          <p>(+94) 81 239 4412</p>
        </div>
      </div>
    </>
  )
}
