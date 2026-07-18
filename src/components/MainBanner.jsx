import React, { useEffect, useState } from 'react'
import styles from './MainBanner.module.scss'

const MainBanner = () => {
  // 수정: JSX에 있던 배너 데이터 대신 JSON 데이터를 저장합니다.
  const [banners, setBanners] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  // 수정: banners.json에서 배너 데이터를 불러옵니다.
  useEffect(() => {
    const loadBanners = async () => {
      const response = await fetch('/data/banners.json')
      const bannerData = await response.json()
      setBanners(bannerData)
    }

    loadBanners()
  }, [])

  // 4초마다 다음 배너로 이동하고, 마지막 배너 뒤에는 첫 배너로 돌아갑니다.
  useEffect(() => {
    if (banners.length === 0) {
      return undefined
    }

    const slideTimer = setInterval(() => {
      setCurrentIndex((previousIndex) => {
        if (previousIndex === banners.length - 1) {
          return 0
        }

        return previousIndex + 1
      })
    }, 4000)

    return () => clearInterval(slideTimer)
  }, [banners.length])

  // 수정: JSON을 불러오기 전에는 안내 문구를 표시합니다.
  if (banners.length === 0) {
    return <section className={styles.banner}>배너를 불러오는 중입니다.</section>
  }

  const currentBanner = banners[currentIndex]

  const showPrevious = () => {
    if (currentIndex === 0) {
      setCurrentIndex(banners.length - 1)
    } else {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const showNext = () => {
    if (currentIndex === banners.length - 1) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  return (
    <section className={styles.banner} aria-label="메인 프로모션">
      <img key={currentBanner.id} src={currentBanner.image} alt="" className={styles.image} />
      <div className={styles.overlay} />

      <div key={`content-${currentBanner.id}`} className={styles.content}>
        <p className={styles.eyebrow}>{currentBanner.eyebrow}</p>
        <h2>{currentBanner.title}</h2>
        <p className={styles.description}>{currentBanner.description}</p>
      </div>

      <button type="button" className={`${styles.arrow} ${styles.previous}`} onClick={showPrevious} aria-label="이전 배너">
        ‹
      </button>
      <button type="button" className={`${styles.arrow} ${styles.next}`} onClick={showNext} aria-label="다음 배너">
        ›
      </button>

      <div className={styles.pagination}>
        {banners.map((banner, index) => (
          <button
            key={banner.id}
            type="button"
            className={index === currentIndex ? styles.active : ''}
            onClick={() => setCurrentIndex(index)}
            aria-label={`${index + 1}번 배너 보기`}
          />
        ))}
      </div>
    </section>
  )
}

export default MainBanner
