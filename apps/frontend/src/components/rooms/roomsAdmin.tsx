import styles from '@/app/page.module.css';
import client from '@/gql/client';
import { useQuery } from '@apollo/client';
import { ROOMS_QUERY } from '@/gql/query';
import { logo } from '@/util/resourceImages';
import { Checkbox, Chip, Image, rem } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { useState } from 'react';

export default function Rooms() {
  const { loading, error, data } = useQuery(ROOMS_QUERY, { client });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const logoSwitcher = (input: string) => {
    const key = input.toLowerCase();
    switch (key) {
      case 'aayu':
        return logo.aayu;
      case 'cbl':
        return logo.cbl;
      case 'hemas':
        return logo.hemas;
      case 'simcentric':
        return logo.simcentric;
      case 'unilever':
        return logo.unilever;
      case 'eyepax':
        return logo.eyepax;
      case 'octave':
        return logo.octave;
      case 'mainframe':
        return logo.mainframe;
      case 'haycarb':
        return logo.haycarb;
      case 'codegen':
        return logo.codegen;
      default:
        break;
    }
  }

  return (
    <div className={styles.queryContainer}>
      {data.rooms?.map((room: any, index: number) => (
        <div className={styles['card']} key={room.id}>
          <div className={styles['card-info']}>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div className={styles['card-img']}>
                <Image src={`company_logos/${logoSwitcher(room.stall.company.name)}`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              <div className={styles['card-meta']}>
                <h4>{`Location: ${room.stall.floorPlanLocation.toUpperCase()}`}</h4>
                <h2>{`Room: ${room.roomNumber}`}</h2>
                <p className={styles['card-id']}>{room.stall.company.name}</p>
              </div>
            </div>
            <div className={styles['card-checkbox']}>
              <Chip
                color="green"
                variant="filled"
                defaultChecked
              >
                vacant
              </Chip>
              <Chip
                color="red"
                variant="filled"
              >
                occupied
              </Chip>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

