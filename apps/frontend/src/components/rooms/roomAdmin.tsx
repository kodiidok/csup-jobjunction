import styles from '@/app/page.module.css';
import { Button, Checkbox, Chip, Image } from '@mantine/core';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useEffect, useState } from 'react';
import { UPDATE_ROOM_MUTATION } from '@/gql/mutation';
import { useMutation } from '@apollo/client';
import client from '@/gql/client';

export interface RoomProps {
  room: any;
  logo: any;
  index: number;
}

export default function Room({ room, logo, index }: RoomProps) {
  const [checked, setChecked] = useState(false);
  const [viewStudents, setViewStudents] = useState(false);
  const [updateRoom] = useMutation(UPDATE_ROOM_MUTATION, { client });
  const [count, setCount] = useState(0);
  const [registered, setRegistered] = useState<any[]>([]);
  const [remaining, setRemaining] = useState<any[]>([]);
  const [completed, setCompleted] = useState<any[]>([]);

  useEffect(() => {
    room.interviews.map((interview: any) => {
      const registeredStudents: any = [];
      interview.students.map((student: any) => {
        registeredStudents.push(student);
      })
      setRegistered(registeredStudents);
      setRemaining(registeredStudents);
      setCount(interview.students.length);
    })
  }, []);

  useEffect(() => {
    // Use room.roomStatus as a dependency
    setChecked(room.roomStatus === 'vacant');
  }, [room.roomStatus]);

  useEffect(() => {
    setCount(remaining.length);
  }, [completed, remaining]);

  // if room.roomStatus === 'vacant' then set checked to true, else false
  const handleOnChange = () => {
    // Use the previous checked value to determine the new status
    const newStatus = !checked;

    // Update the checked state immediately
    setChecked(newStatus);

    // Call the mutation with the new room status
    handleUpdateRoom(room.id, newStatus ? "vacant" : "occupied");
  };

  const handleUpdateRoomInterviews = (id: string, completed: any[], remainingInterviews: any[]) => {
    // const remainingInterviewsStudentIds = remainingInterviews.map(interview => interview.id);
    const completedInterviewsStudentIds = completed.map(interview => interview.id);
    // Convert the array to a string in the desired format
    const resultString = `{${completedInterviewsStudentIds.join(', ')}, }`;
    // console.log(remainingInterviewsStudentIds, completedInterviewsStudentIds, resultString);
    updateRoom({
      variables: {
        id: id,
        input: {
          completedInterviewIds: resultString,
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

  const handleViewStudents = () => {
    setViewStudents(!viewStudents);
  }

  const handleStudentSelection = (student: any, checked: boolean) => {
    setRemaining((prevRemaining) => {
      if (checked) {
        // Remove the student from remaining
        const updatedRemaining = prevRemaining.filter((s) => s.id !== student.id);

        // Add the student to completed
        setCompleted((prevCompleted) => [...prevCompleted, student]);

        return updatedRemaining;
      } else {
        // Remove the student from completed
        const updatedCompleted = completed.filter((s) => s.id !== student.id);

        // Add the student back to remaining
        setCompleted(updatedCompleted);

        return [...prevRemaining, student];
      }
    });
  };

  const handleSave = () => {
    handleUpdateRoomInterviews(room.id, completed, remaining);
  }

  return (
    <div id={`${room.id}`} className={styles['card']}>
      <div className={styles['card-checkbox']}>
        <h3>{`Remaining: ${count}`}</h3>
      </div>
      <div className={styles['card-info']}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {/* <div className={styles['card-img']}>
            <Image src={`company_logos/${logo}`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </div> */}
          <div className={styles['card-meta']}>
            <h4>{`${room.roomName.toUpperCase()}`}</h4>
            {room.roomNumber && <h2>{`Room: ${room.roomNumber}`}</h2>}
            <p className={styles['card-id-big']}>{room.stall.company.name}</p>
            <div className={styles['card-checkbox-chip']}>
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
        <div className={styles['room-btns']}>
          <div className={styles['card-checkbox']}>
            <Button onClick={() => handleViewStudents()} leftIcon={!viewStudents ? <VisibilityIcon /> : <VisibilityOffIcon />} >
              View
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </div>
      {
        viewStudents &&
        <div style={{ marginTop: '0.5rem' }}>
          {room.interviews.map((interview: any) => (
            <div key={interview.id} className={styles['room-students']}>
              {interview.students.map((student: any) => (
                <div key={student.id} className={styles['room-student']}>
                  <Checkbox onChange={(event) => { handleStudentSelection(student, event.target.checked) }} />
                  <p className={styles['bold-text']}>{student.name}</p>
                  <p>{student.email}</p>
                  {/* <p className={styles['card-id']}>{student.id}</p> */}
                </div>
              ))}
            </div>
          ))}
        </div>
      }
    </div>
  );
}