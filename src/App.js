import React from 'react';

import Catalog from './Components/Catalog'

import mockData from './mockCatalog'

import './main.scss'

const makeAst = (data) => data.reduce((acc, elem) => {    
  const newAcc = {
    ...acc, 
    [elem.id]: { ...elem },
  }
  return newAcc;
}, {})

const App = () => {
  return (
    <section className="container">
      <h1>Ты сегодня покормил кота?</h1>
      <Catalog data={makeAst(mockData)} />
    </section>
  );
}

export default App
