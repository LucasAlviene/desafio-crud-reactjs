import React from 'react';
import {BrowserRouter, Route } from "react-router-dom";

import {Header,Footer} from './layout';

import Lista from './view/lista';
import Adicionar from './view/adicionar';
import Ver from './view/ver';
import Editar from './view/editar/';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Route exact path="/" component={Lista} />
        <Route path="/adicionar" component={Adicionar} />
        <Route path="/ver/:id" component={Ver} />
        <Route path="/editar/:id" component={Editar} />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
