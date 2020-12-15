import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './pages/Home'
import Produto from './pages/Produto'


export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/produtos/:id" component={Produto}/>
                
            </Switch>
        </BrowserRouter>
    );
}