import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import Demo from './Demo';
import Stats from './Stats';
import Footer from './Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-bg text-text font-sans overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Demo />
      <Stats />
      <Footer />
    </div>
  );
}
