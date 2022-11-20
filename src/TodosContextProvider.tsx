import React, { Dispatch, SetStateAction, useState, useEffect, useContext } from "react"
import { createContext } from "react"
import { TodoType } from "./types"
import { getStorageTodos, setStorageTodos } from "./helpers/todos"

interface TodosContext {
  todos: Array<TodoType>
  setTodos: Dispatch<SetStateAction<Array<TodoType>>>
}

interface Props {
  children: React.ReactElement
}

const todosContext = createContext<TodosContext>({} as TodosContext)

export const useTodosContext = () => {
  return useContext(todosContext)
}

const TodosContextProvider = ({ children }: Props) => {

  const [todos, setTodos] = useState<Array<TodoType>>(getStorageTodos())

  useEffect(() => {
    setStorageTodos(todos)
  }, [todos])

  return (
    <todosContext.Provider value={{ todos, setTodos }}>
      {children}
    </todosContext.Provider>
  )
}

export default TodosContextProvider