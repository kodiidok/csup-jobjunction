'use client'

import styles from '@/app/page.module.css'
import FloorPlan from '@/components/floorPlan/floorPlan'
import Header from '@/components/header/header'
import Stalls from '@/components/stalls/stalls'

export default function Home() {

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.hero}>
            <h1>This is the hero section</h1>
          </div>
          <FloorPlan />
          <Stalls />
        </div>
      </main>
    </>
  )
}
