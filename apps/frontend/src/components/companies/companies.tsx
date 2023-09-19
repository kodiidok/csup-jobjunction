import styles from '@/app/page.module.css';
import client from '@/gql/client';
import { useQuery } from '@apollo/client';
import { COMPANIES_QUERY } from '@/gql/query';
import { logo } from '@/util/resourceImages';
import { Image } from '@mantine/core';

export default function Companies() {
  const { loading, error, data } = useQuery(COMPANIES_QUERY, { client });

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
      {data.companies?.map((company: any) => (
        <div className={styles['card']} key={company.id}>
          {/* <div style={{ width: '100px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image src={`company_logos/${logoSwitcher(company.name)}`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </div> */}
          <h3>{company.name.charAt(0).toUpperCase() + company.name.slice(1)}</h3>
          <p>{company.email}</p>
          {/* <p className={styles['card-id']}>{company.id}</p> */}
        </div>
      ))}
    </div>
  );
}
