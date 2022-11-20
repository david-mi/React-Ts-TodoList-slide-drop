import React from 'react'
import styles from "./DeleteButton.module.scss"
import { useTodosContext } from "../../../../TodosContextProvider"

interface Props {
  id: string
}

const DeleteButton = ({ id }: Props) => {
  const { todos, setTodos } = useTodosContext()

  const handleDelete = () => {
    const filteredTodos = todos.filter(todo => todo.id !== id)
    setTodos(filteredTodos)
  }

  return (
    <button
      onClick={handleDelete}
      className={`${styles.button} btn`}
    >
      <i className="fas fa-trash"></i>
    </button>
  )
}

export default DeleteButton