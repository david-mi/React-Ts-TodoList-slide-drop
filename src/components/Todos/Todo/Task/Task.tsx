import React, { SetStateAction, useEffect, useRef, useState } from "react"
import { useTodosContext } from "../../../../TodosContextProvider"
import { TodoType } from "../../../../types"
import styles from "./Task.module.scss"

interface Props {
  task: string,
  id: string,
  isEditing: boolean,
  setIsEditing: React.Dispatch<SetStateAction<boolean>>
}

const Task = (props: Props) => {
  const { task, id, isEditing, setIsEditing } = props
  const { todos, setTodos } = useTodosContext()
  const taskRef = useRef<HTMLParagraphElement>(null)
  const taskRefWidth = useRef<null | number>(null)
  const taskRefHeight = useRef<null | number>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [editedText, setEditedText] = useState(task)

  const handleClick = () => {
    taskRefWidth.current = taskRef.current!.getBoundingClientRect().width
    taskRefHeight.current = taskRef.current!.getBoundingClientRect().height
    setIsEditing(true)
  }

  const handleInput = ({ target }: React.ChangeEvent) => {
    const text = (target as HTMLInputElement).value
    setEditedText(text)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    event.stopPropagation()
    if (event.key === "Enter") {
      handleSubmit(event)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!editedText || editedText === task) {
      setIsEditing(false)
      return
    }

    setTodos(todos.map((prevTodo: TodoType) => {
      return prevTodo.id === id
        ? { ...prevTodo, task: editedText }
        : prevTodo
    }))

    setIsEditing(false)
  }

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  return (
    isEditing
      ? (
        <textarea
          className={styles.text}
          value={editedText}
          ref={inputRef}
          onChange={handleInput}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
          style={{ width: taskRefWidth.current!, height: taskRefHeight.current! }}
        />
      )
      : (
        <p
          ref={taskRef}
          className={styles.task}
          onClick={handleClick}
        >
          {task}
        </p>
      )
  )
}

export default Task