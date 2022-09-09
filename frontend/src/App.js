import './App.css';
import Navbar from './Components/Navbar';
import HomeCard from './Components/HomeCard';
import Advertisement from './Components/Advertisement';
import Footer from './Components/Footer';
import Carousel from './Components/Carousel';

function App() {
  return (
    <div>
      <Navbar />
      <HomeCard />
      <Carousel />
      <Carousel />
      <Advertisement />
      <Footer />
    </div>
  );
}

export default App;
