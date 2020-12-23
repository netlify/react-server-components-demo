import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {useServerResponse} from './Cache.client';

const title = 'React with Webpack and Babel';
 
const App = (props) => {
    const response = useServerResponse({})
    return response.readRoot()
}


ReactDOM.render(
    <Suspense fallback={<div>Loading...</div>}>
    <div>
        <h1>{title}</h1>
        <App/>
    </div>
    </Suspense>,
  document.getElementById('app')
);