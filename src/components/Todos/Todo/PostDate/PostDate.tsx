import formatDate from "../../../../helpers/formatDate"
import styles from "./PostDate.module.scss"

interface Props {
  createdAt: number
}

const PostDate = ({ createdAt }: Props) => {
  return (
    <small className={styles.date}>
      {formatDate(createdAt)}
    </small>
  )
}

export default PostDate