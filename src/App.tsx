import React from 'react';
import './scss/app.scss';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { NotFound } from './pages/NotFound';

interface SearchContextType {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const searchContex = React.createContext<SearchContextType>({
  searchValue: '',
  setSearchValue: () => {},
});

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className='wrapper'>
      <searchContex.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className='content'>
          <Routes>
            <Route path='' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </searchContex.Provider>
    </div>
  );
}

export default App;
