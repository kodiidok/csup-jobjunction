import styles from '@/app/page.module.css';
import client from '@/gql/client';
import { useQuery } from '@apollo/client';
import { USERS_QUERY } from '@/gql/query';

interface StallProps {
  companyName: string
}

export default function Stalls() {
  const { loading, error, data } = useQuery(USERS_QUERY, { client });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.stallsContainer}>
      {data.users?.map((user: any) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
        </div>
      ))}
    </div>
  );
}
