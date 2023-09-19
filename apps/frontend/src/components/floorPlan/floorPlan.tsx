'use client'

import styles from '@/app/page.module.css'
import { Image } from '@mantine/core'

export default function FloorPlan() {

  return (
    <div>
      <h3 className={styles['subheading']}>Floor Plan</h3>
      <div className={styles.floorPlanImageContainer}>
        <div className={styles.floorPlanImage}>
          <Image src='dummy_image_1.webp' />
        </div>
      </div>
    </div>
  )
}
