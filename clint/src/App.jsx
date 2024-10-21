import RouteApp from "../Routes/RouteApp.jsx"
import Footer from "./Components/Footer/Footer.jsx"
import NavigationBar from "./Components/NavigationBar/NavigationBar.jsx"
import { CartContextProvider, UserEmailProvider } from "./Context/CartContextProvider.jsx"

function App() {


  return (
    <>
      <CartContextProvider>
        <UserEmailProvider>
        <RouteApp />
        </UserEmailProvider>
      </CartContextProvider>
    </>
  )
}

export default App
