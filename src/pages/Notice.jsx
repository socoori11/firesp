import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Notice.module.scss'

const Notice = () => {
  // 수정: notices.json에서 받은 공지사항을 저장합니다.
  const [notices, setNotices] = useState([])

  // 수정: Firebase 연결 전에는 JSON에서 공지사항을 불러옵니다.
  useEffect(() => {
    const loadNotices = async () => {
      const response = await fetch('/data/notices.json')
      const noticeData = await response.json()
      setNotices(noticeData)
    }

    loadNotices()
  }, [])

  return (
    <section className={styles.noticePage}>
      <div className={styles.titleArea}>
        <p>NOTICE</p>
        <h2>공지사항</h2>
        <span>Fire Shopping의 새로운 소식을 확인하세요.</span>
      </div>

      <div className={styles.noticeList}>
        <div className={styles.listHeader}>
          <span>번호</span>
          <span>제목</span>
          <span>작성일</span>
          <span>조회</span>
        </div>

        {/* 수정: JSON에서 불러온 공지사항을 반복해서 표시합니다. */}
        {notices.map((notice) => (
          <div key={notice.id} className={styles.noticeItem}>
            <span className={styles.number}>
              {notice.important ? <strong>공지</strong> : notice.id}
            </span>
            <Link to={`/notice/${notice.id}`} className={styles.noticeTitle}>
              {notice.title}
            </Link>
            <span className={styles.date}>{notice.date}</span>
            <span className={styles.views}>{notice.views}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Notice
