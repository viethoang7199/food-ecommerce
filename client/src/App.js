import Header from './components/Header';
import Router from './router/Routers'
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main className='main'>
        <Router />
      </main>
      <Footer />
    </>
  );
}

export default App;
