import { Dispatch, SetStateAction } from "react"
import styles from "./Input.module.scss"

interface Props {
  todoName: string | null,
  setTodoName: Dispatch<SetStateAction<string | null>>
}

const Input = (props: Props) => {
  const { todoName, setTodoName } = props

  return (
    <input
      className={styles.input}
      value={todoName || ""}
      onChange={({ target }) => setTodoName(target.value)}
      placeholder="Add Todo"
    />
  )
}

export default Input