import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-shell__main">
        <HomePage />
      </main>
      <Footer />
    </div>
  )
}
