import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <Navbar />
      <main>
        <HomePage />
      </main>
      <Footer />
    </div>
  )
}
