import NavBar from "./components/navBar"
import Welcome from "./components/welcome"

const App = () => {

  return (
    <div className="flex flex-col gap-8">
      <NavBar />
      <Welcome />
    </div>
  )
}

export default App