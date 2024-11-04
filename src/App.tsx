import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "./pages/Home/Home"
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import SignIn from './pages/Signin/SignIn'

function App() {

  return (
    <body>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin/" element={<SignIn />} />
        </Routes>
        <Footer />
      </Router>
    </body>

  )
}

export default App
