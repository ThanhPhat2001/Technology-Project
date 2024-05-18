import React from 'react'
import styles from "./homepage.module.css"

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <div className={`py-10 container mx-auto 2xl:px-28 lg:px-5 md:px-3 sm:px-3 ${styles.main_homePage}`}>
        <div className={`${styles.banner}`}>
         <div className="main_banner block md:grid grid-cols-12">
          <div className="slider col-span-12 xl:col-span-6">slider</div>
          <div className="image col-span-12 xl:col-span-6">image</div>
         </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage