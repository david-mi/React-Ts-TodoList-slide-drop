import styles from "./PinIcon.module.scss"

interface Props {
  color: string
}

const PinIcon = ({ color }: Props) => {
  return (
    <div className={styles.pinContainer}>
      <i
        className="fas fa-thumbtack"
        style={{ color }}
      >
      </i>
    </div>
  )
}

export default PinIcon