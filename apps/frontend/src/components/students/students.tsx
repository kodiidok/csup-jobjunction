import styles from '@/app/page.module.css';
import client from '@/gql/client';
import { useQuery } from '@apollo/client';
import { STUDENTS_QUERY } from '@/gql/query';

export default function Students() {
  const { loading, error, data } = useQuery(STUDENTS_QUERY, { client });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.queryContainer}>
      {data.students?.map((student: any) => (
        <div className={styles['card']} key={student.id}>
          {/* {JSON.stringify(student)} */}
          <h3>{student.name.charAt(0).toUpperCase() + student.name.slice(1)}</h3>
          <p>{student.email}</p>
          <p className={styles['card-id']}>{student.id}</p>
        </div>
      ))}
    </div>
  );
}
