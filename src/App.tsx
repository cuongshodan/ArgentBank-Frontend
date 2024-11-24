import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "./pages/Home/Home"
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import SignIn from './pages/Signin/SignIn'
import Profile from './pages/Profile/Profile'

function App() {

  return (
    <body>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin/" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </Router>
    </body>

  )
}

export default App
