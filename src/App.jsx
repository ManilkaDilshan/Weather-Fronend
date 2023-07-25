import Routes from "./routes/Routes";
import { UserContextProvider } from "./context/UserContext";

function App() {
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  )
}

export default App
