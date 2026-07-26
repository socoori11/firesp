import React from 'react'
import { Link } from 'react-router-dom'
import styles from './EmptyMessage.module.scss'

const EmptyMessage = ({ image, title, description, link, linkText }) => {
  return (
    <div className={styles.emptyMessage}>
      <img src={image} alt="" />
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={link}>{linkText}</Link>
    </div>
  )
}

export default EmptyMessage
