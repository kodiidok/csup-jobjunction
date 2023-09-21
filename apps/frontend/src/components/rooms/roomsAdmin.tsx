import styles from '@/app/page.module.css';
import client from '@/gql/client';
import { useQuery } from '@apollo/client';
import { ROOMS_QUERY } from '@/gql/query';
import { logo } from '@/util/resourceImages';;
import Room from './roomAdmin';
import { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import SaveIcon from '@mui/icons-material/Save';

export default function Rooms() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<any[]>([]);
  const { loading, error, data } = useQuery(ROOMS_QUERY, { client });

  useEffect(() => {
    if (data) {
      setRooms(data.rooms);
      setFilteredRooms(data.rooms); // Initially, set filteredRooms to all rooms
    }
  }, [data]);

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

  const filterRooms = () => {
    const sessionStorageCompanyList = sessionStorage.getItem('companies');
    const companyIds = JSON.parse(sessionStorageCompanyList ?? '[]'); // Default to an empty array if sessionStorageCompanyList is null

    // console.log(companyIds);
    // console.log(rooms);

    if (Array.isArray(companyIds)) {
      const filteredRooms = rooms.filter((room: any) => companyIds.includes(room.stall.company.id));
      // console.log(filteredRooms);
      setFilteredRooms(filteredRooms); // Update the state with the filtered rooms
    }
  }

  const resetFilter = () => {
    sessionStorage.setItem('companies', '');
    setFilteredRooms(rooms);
  }

  const handleSave = () => {
    
  }
  
  return (
    <div>
      <div className={styles['filter']}>
        <h2 className={styles['subheading']}>Interviews</h2>
        <div className={styles['filter-btn-container']}>
          <Button color='cyan' onClick={filterRooms}>Filter Rooms</Button>
          <Button color='orange' onClick={resetFilter}>Reset</Button>
        </div>
      </div>
      <div className={styles.queryContainer}>
        {filteredRooms?.map((room: any, index: number) => (
          <Room key={index} index={index} logo={logoSwitcher(room.stall.company.name) || ''} room={room} />
        ))}
      </div>
    </div>
  );
}

