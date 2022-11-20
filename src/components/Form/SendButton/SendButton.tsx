import React from 'react'
import styles from "./SendButton.module.scss"

interface Props {
  handleSubmit: (e: React.FormEvent) => void
}

const SendButton = ({ handleSubmit }: Props) => {
  return (
    <button
      onClick={handleSubmit}
      className={`${styles.button} btn`}
    >
      <i className="fas fa-plus"></i>
    </button>

  )
}

export default SendButton