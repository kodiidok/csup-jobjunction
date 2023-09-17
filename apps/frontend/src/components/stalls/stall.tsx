import styles from '@/app/page.module.css';
import { Image } from '@mantine/core';
// import client from '@/gql/client';
// import { useQuery } from '@apollo/client';
// import { USERS_QUERY } from '@/gql/query';

export default function Stall() {

  return (
    <div className={styles.stallOuterContainer}>
      <div className={styles.stallInnerContainer}>
        <div className={styles.stallInfo}>
          <div className={styles.imageContainer}>
            <Image width={50} height={50} aria-label='company-image' />
          </div>
          <div>
            <h5>Room Number</h5>
            <h6>Company Name</h6>
          </div>
          <div className={styles.roomVacantStatus}>
            <h4>Room Vacant Status</h4>
          </div>
        </div>
        <div className={styles.roomStatusIndicator}>
          {/* an empty div that shows the background color */}
        </div>
      </div>
    </div>
  );
}
