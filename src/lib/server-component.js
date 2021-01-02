import React from 'react';
import streams from 'memory-streams';
import {pipeToNodeWritable} from 'react-server-dom-webpack/writer.node.server';
import App from '../App.server';
import moduleMap from '../../dist/react-client-manifest.json'

async function serverComponent(location, redirectToId) {
    const writer = new streams.WritableStream();

    if (redirectToId) {
        location.selectedId = redirectToId
    }

    return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve({
            statusCode: 200,
            body: writer.toString(),
            headers: {'Content-Type': 'application/text', 'X-Location': JSON.stringify(location)}
        }))
        pipeToNodeWritable(React.createElement(App, location), writer, moduleMap)
    })
}

export default serverComponent