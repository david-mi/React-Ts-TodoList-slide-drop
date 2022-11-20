import { TodoType } from "../types"
import getRandomArrayIndex from "./getRandomArrayIndex"
import colorsList from "../data/colorsList"

const getRandomColor = (todos: Array<TodoType>) => {
  let color = colorsList[getRandomArrayIndex(colorsList)]

  const lastTodo = todos.at(-1)
  if (lastTodo !== undefined) {
    while (color === lastTodo.color) {
      color = colorsList[getRandomArrayIndex(colorsList)]
    }
  }

  return color
}

export default getRandomColor