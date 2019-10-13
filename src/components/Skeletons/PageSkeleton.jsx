import React from 'react'
import ContentLoader from 'react-content-loader'

import styles from './PageSkeleton.scss'

const PageSkeleton = () => (
  <div className={`page-container ${styles['page-skeleton']}`}>
    <h1 className={`h1 ${styles.heading}`}>
      <span className={styles.text}>
        <ContentLoader height={35} width={250} speed={1} primaryColor="#f3f3f3" secondaryColor="#ecebeb" uniquekey="page_header">
          <rect x="0" y="0" rx="2" ry="2" width="250" height="35" />
        </ContentLoader>
      </span>
    </h1>
    <div className="main-section">
      <ContentLoader height={100} width={400} speed={1} primaryColor="#ffffff" secondaryColor="#f5f5f5" uniquekey="page_content">
        <rect x="0" y="0" rx="2" ry="2" width="400" height="100" />
      </ContentLoader>
    </div>
  </div>
)

export default PageSkeleton
