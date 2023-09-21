'use client'

import styles from '@/app/page.module.css'
import { Image } from '@mantine/core'

export default function FloorPlan() {

  return (
    <div className={styles['floorplan']}>
      {/* <h2 className={styles['subheading']}>Floor Plan</h2> */}
      <div className={styles.floorPlanImageContainer}>
        <div className={styles.floorPlanImage}>
          <Image src='map.jpg' />
        </div>
      </div>
    </div>
  )
}
