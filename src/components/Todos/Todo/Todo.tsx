import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";
import styles from "./Todo.module.scss"
import { TodoType } from "../../../types"
import { PostDate, PinIcon, Task, DeleteButton } from "../index"
import { useTodosContext } from "../../../TodosContextProvider";

interface Props {
  todo: TodoType
  index: number
  targetIndex: number | null
  setTargetIndex: Dispatch<SetStateAction<null | number>>
  startingIndex: number | null
  setStartingIndex: Dispatch<SetStateAction<null | number>>
}

const Todo = (props: Props) => {
  const { todo, index, targetIndex, setTargetIndex, startingIndex, setStartingIndex } = props
  const { id, color, task, createdAt } = todo

  const { todos, setTodos } = useTodosContext()
  const containerRef = useRef<HTMLElement>(null!)
  const clientYInitRef = useRef<null | number>(null)
  const clientXInitRef = useRef<null | number>(null)
  const [isHolding, setIsHolding] = useState(false);

  const [isEditing, setIsEditing] = useState(false)

  const targetIndexRef = useRef<null | number>(null)
  targetIndexRef.current = targetIndex

  const handleMouseDown = (e: MouseEvent) => {
    console.log("down")
    clientYInitRef.current = e.clientY
    clientXInitRef.current = e.clientX
    setStartingIndex(Number(containerRef.current.dataset.index))
    containerRef.current.style.zIndex = "4"
    setIsHolding(true)
  }

  const handleMouseUp = () => {
    console.log("up")
    containerRef.current.style.bottom = "auto"
    containerRef.current.style.right = "auto"
    containerRef.current.style.zIndex = "5"

    if (
      targetIndexRef.current !== null &&
      startingIndex !== null &&
      startingIndex !== targetIndexRef.current
    ) {
      const todosMap = todos.map((todo, index) => {
        switch (index) {
          case startingIndex:
            return { ...todos[targetIndexRef.current] };
          case targetIndexRef.current:
            return { ...todos[startingIndex] };
          default:
            return todo
        }
      })
      setTodos(todosMap)
    }
    setIsHolding(false)
    setTargetIndex(null)
  }

  const handleMouseMove = (e: MouseEvent) => {
    const yDiff = clientYInitRef.current! - e.clientY
    const xDiff = clientXInitRef.current! - e.clientX
    containerRef.current.style.bottom = yDiff + "px"
    containerRef.current.style.right = xDiff + "px"


    if (e.target instanceof HTMLElement && e.target.closest("[data-index]") !== null) {
      const checkTodoContainer = e.target.closest("[data-index]")
      setTargetIndex(Number(checkTodoContainer.dataset.index))
    }
  }

  useEffect(() => {
    console.log(isEditing)
    if (isHolding && !isEditing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isHolding, isEditing])

  const getContainerClass = () => {
    let containerClass = styles.container

    if (targetIndex !== startingIndex && targetIndex === index) {
      containerClass += " target"
    }

    return containerClass
  }

  return (
    <div
      data-index={index}
      className={getContainerClass()}
      onMouseDown={handleMouseDown}
      style={{ backgroundColor: color }}
      ref={containerRef}
    >
      <PinIcon color={color} />
      <Task
        task={task}
        id={id}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      <PostDate createdAt={createdAt} />
      <DeleteButton id={id} />
    </div>
  )
}

export default Todo