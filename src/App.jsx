import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import Challenges from './components/sections/Challenges';
import Services from './components/sections/Services';
import Process from './components/sections/Process';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import './App.css';

function App() {
  return (
    <Layout>
      <Hero />
      <Challenges />
      <Services />
      <Process />
      <About />
      <Contact />
    </Layout>
  );
}

export default App;
