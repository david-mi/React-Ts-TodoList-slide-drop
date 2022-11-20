import styles from "./App.module.scss"
import Form from "./components/Form/Form"
import Todos from "./components/Todos/Todos"
import TodosContextProvider from "./TodosContextProvider"

const App = () => {
  return (
    <TodosContextProvider>
      <main className={styles.container}>
        <Form />
        <Todos />
      </main>
    </TodosContextProvider>
  )
}

export default App

