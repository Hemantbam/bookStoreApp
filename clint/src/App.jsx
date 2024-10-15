import RouteApp from "../Routes/RouteApp.jsx"
import Footer from "./Components/Footer/Footer.jsx"
import NavigationBar from "./Components/NavigationBar/NavigationBar.jsx"
import CartContextProvider from "./Context/CartContextProvider.jsx"

function App() {


  return (
    <>
      <CartContextProvider>
        <RouteApp />
      </CartContextProvider>
    </>
  )
}

export default App
