import React from 'react'
import {Search} from './components/search';
import {Results} from './components/results';
import {Detail} from './components/detail';
import './styles/style.scss';

export const server: string = 'http://localhost:9000';

const App: React.FC = () => {
  return (
    <div>
      <Search/>
      {window.location.search && <Results/>}
      {window.location.pathname.split('/')[1] == 'items' && !window.location.search && <Detail/>}
    </div>
  );
}

export default App;