import styles from '@/app/page.module.css';
import { Chip, Image } from '@mantine/core';
import { useEffect, useState } from 'react';
import { UPDATE_ROOM_STATUS_MUTATION } from '@/gql/mutation';
import { useMutation } from '@apollo/client';
import client from '@/gql/client';

export interface RoomProps {
  room: any;
  logo: any;
  index: number;
}

export default function Room({ room, logo, index }: RoomProps) {
  const [checked, setChecked] = useState(false);
  const [updateRoom] = useMutation(UPDATE_ROOM_STATUS_MUTATION, { client });

  useEffect(() => {
    // Use room.roomStatus as a dependency
    setChecked(room.roomStatus === 'vacant');
    console.log(room.id);
    console.log(room.roomStatus);
    console.log(checked);
  }, [room.roomStatus]);

  // if room.roomStatus === 'vacant' then set checked to true, else false
  const handleOnChange = () => {
    // Use the previous checked value to determine the new status
    const newStatus = !checked;

    // Update the checked state immediately
    setChecked(newStatus);

    // Call the mutation with the new room status
    handleUpdateRoom(room.id, newStatus ? "vacant" : "occupied");

    console.log(room.id);
    console.log(room.roomStatus);
    console.log(checked);
  };

  const handleUpdateRoom = (id: string, roomStatus: string) => {
    updateRoom({
      variables: {
        id: id,
        input: {
          roomStatus: roomStatus,
        },
      },
    })
      .then((response) => {
        // Handle the response if needed
        console.log(response.data); // Access the updated room data
      })
      .catch((error) => {
        // Handle errors if they occur
        console.error(error);
      });
  };

  return (
    <div id={`${room.id}`} className={styles['card']}>
      <div className={styles['card-info']}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <div className={styles['card-img']}>
            <Image src={`company_logos/${logo}`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </div>
          <div className={styles['card-meta']}>
            <h4>{`Location: ${room.stall.floorPlanLocation.toUpperCase()}`}</h4>
            <h2>{`Room: ${room.roomNumber}`}</h2>
            <p className={styles['card-id']}>{room.stall.company.name}</p>
            <p className={styles['card-id']}>{room.id}</p>
          </div>
        </div>
        <div className={styles['card-checkbox']}>
          <Chip
            id={`chip-vacant-${index}`}
            color="green"
            variant="filled"
            checked={checked}
            onChange={handleOnChange}
          >
            vacant
          </Chip>
          <Chip
            id={`chip-occupied-${index}`}
            color="red"
            variant="filled"
            checked={!checked}
            onChange={handleOnChange}
          >
            occupied
          </Chip>
        </div>
      </div>
    </div>
  );
}