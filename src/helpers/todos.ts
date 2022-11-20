import { TodoType } from "../types"

export const getStorageTodos = (): Array<TodoType> => {
  const storageTodos = localStorage.getItem("todos")
  if (storageTodos !== null) {
    return JSON.parse(storageTodos)
  }

  return []
}

export const setStorageTodos = (todos: Array<TodoType>): void => {
  localStorage.setItem("todos", JSON.stringify(todos))
}
