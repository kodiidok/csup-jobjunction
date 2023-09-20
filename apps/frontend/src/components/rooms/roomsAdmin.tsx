import styles from '@/app/page.module.css';
import client from '@/gql/client';
import { useQuery } from '@apollo/client';
import { ROOMS_QUERY } from '@/gql/query';
import { logo } from '@/util/resourceImages';;
import Room from './roomAdmin';
import { Button } from '@mantine/core';

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
    <div>
      <div className={styles['subheadin-row']}>
        <h2 className={styles['subheading']}>Interviews</h2>
        <Button>Save</Button>
      </div>
      <div className={styles.queryContainer}>
        {data.rooms?.map((room: any, index: number) => (
          <Room key={index} index={index} logo={logoSwitcher(room.stall.company.name)} room={room} />
        ))}
      </div>
    </div>
  );
}

