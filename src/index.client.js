import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {useServerResponse} from './Cache.client';

const title = 'React Server Components on Netlify';
 
const Message = (props) => {
    const response = useServerResponse(props)
    return response.readRoot()
}

ReactDOM.render(
    <Suspense fallback={<div>Loading...</div>}>
    <div>
        <h1>{title}</h1>
        <Message name="World" />
        <Message name="Server" />
    </div>
    </Suspense>,
  document.getElementById('app')
);