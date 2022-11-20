import { useState } from "react"
import styles from "./Todos.module.scss"
import { Todo } from "./index"
import { useTodosContext } from "../../TodosContextProvider"

const Todos = () => {
  const { todos } = useTodosContext()

  const [targetIndex, setTargetIndex] = useState<null | number>(null)
  const [startingIndex, setStartingIndex] = useState<null | number>(null)

  return (
    <section className={styles.container}>
      {todos.map((todo, index) => (
        <Todo
          key={todo.id}
          index={index}
          todo={todo}
          targetIndex={targetIndex}
          setTargetIndex={setTargetIndex}
          startingIndex={startingIndex}
          setStartingIndex={setStartingIndex}
        />
      ))}
    </section>
  )
}

export default Todos