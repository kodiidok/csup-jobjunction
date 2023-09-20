import Tag from "./tag";
import styles from '@/app/page.module.css';
import client from '@/gql/client';
import { useQuery } from '@apollo/client';
import { COMPANIES_QUERY } from '@/gql/query';
import { useEffect, useState } from "react";

export default function Tags() {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const { loading, error, data } = useQuery(COMPANIES_QUERY, { client });

  // Use a useEffect hook to log the updated selectedCompanies array
  useEffect(() => {
    // console.log(selectedCompanies);
    sessionStorage.setItem('companies', JSON.stringify(selectedCompanies));
  }, [selectedCompanies]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleTagClick = (id: string) => {
    // Check if the company ID is already in the selectedCompanies array
    if (selectedCompanies.includes(id)) {
      // If it's already selected, remove it from the selectedCompanies array
      setSelectedCompanies((prevSelectedCompanies) =>
        prevSelectedCompanies.filter((companyId) => companyId !== id)
      );
    } else {
      // If it's not selected, add it to the selectedCompanies array
      setSelectedCompanies((prevSelectedCompanies) => [
        ...prevSelectedCompanies,
        id,
      ]);
    }
  };

  return (
    <div className={styles['tag-container']}>
      {data.companies?.map((company: any) => (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleTagClick(company.id);
          }}
          key={company.id}
        >
          <div className={selectedCompanies.includes(company.id) ? styles['tag-active'] : styles['tag']}>
            <p>{company.name.charAt(0).toUpperCase() + company.name.slice(1)}</p>
          </div>
        </a>
      ))}
    </div>
  );
}