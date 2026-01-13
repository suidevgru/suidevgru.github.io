import React from 'react';
import styles from './HomepageLanding.module.css';

type LogoSize = 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'hero' | 'navbar';

interface SuiDevgruLogoProps {
  size?: LogoSize;
}

export default function SuiDevgruLogo({ size = 'medium' }: SuiDevgruLogoProps) {
  const sizeClass = styles[size] || styles.medium;
  
  return (
    <div className={`${styles.logo} ${sizeClass}`}>
      <span className={styles.sui}>sui/</span>
      <span className={styles.prompt}> &gt;_ </span>
      <span className={styles.devgru}>devgru</span>
      <span className={styles.cursor} />
    </div>
  );
}
