'use client'

import styles from '@/app/page.module.css'
import Tags from '@/components/filters/tags'
import FloorPlan from '@/components/floorPlan/floorPlan'
import Header from '@/components/header/header'
import Rooms from '@/components/rooms/rooms'
import { APP_DESCRIPTION, APP_NAME } from '@/util/resourceNames'
import { useEffect, useState } from 'react'

export default function Home() {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  useEffect(() => {
    // Retrieve the selected companies from session storage
    const storedSelectedCompanies = sessionStorage.getItem('companies');
    if (storedSelectedCompanies) {
      // Parse the stored string as JSON to get an array
      const selected = JSON.parse(storedSelectedCompanies);
      setSelectedCompanies(selected);
    }
  }, [selectedCompanies]);

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
          <div>{selectedCompanies}</div>
          <Rooms selectedCompanies={selectedCompanies} />
        </div>
      </main>
    </>
  )
}
