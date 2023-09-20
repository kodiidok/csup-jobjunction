import styles from '@/app/page.module.css'

export default function Footer() {
  return (
    <div className={styles['footer']}>
      <div className={styles['footer-item']}>
        <h3>Address</h3>
        <p>Science Industry Interaction Cell, Faculty of Science, University of Peradeniya.</p>
      </div>
      <div className={styles['footer-item']}>
        <h3>Email</h3>
        <p>siic@pdn.ac.lk / info.siic@sci.pdn.ac.lk</p>
      </div>
      <div className={styles['footer-item']}>
        <h3>Phone</h3>
        <p>(+94) 81 238 9152</p>
        <p>(+94) 81 239 4412</p>
      </div>
    </div>
  );
}