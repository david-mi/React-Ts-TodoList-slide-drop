import { useState } from "react"
import { v4 as id } from "uuid"
import { TodoType } from "../../types"
import styles from "./Form.module.scss"
import { SendButton, Input } from "./index"
import getRandomColor from "../../helpers/getRandomColor"
import { useTodosContext } from "../../TodosContextProvider"

const Form = () => {
  const { todos, setTodos } = useTodosContext()
  const [todoName, setTodoName] = useState<null | string>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (todoName === null) {
      return
    }
    const newTodo = {
      id: id(),
      task: todoName,
      color: getRandomColor(todos),
      createdAt: Date.now()
    }

    setTodos((previousTodos: Array<TodoType>) => {
      return [...previousTodos, newTodo]
    })

    setTodoName(null)
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <Input
        todoName={todoName}
        setTodoName={setTodoName}
      />

      <SendButton handleSubmit={handleSubmit} />
    </form>
  )
}

export default Form