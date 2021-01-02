import React from 'react';
import streams from 'memory-streams';
import {pipeToNodeWritable} from 'react-server-dom-webpack/writer.node.server';
import App from '../src/App.server';
import moduleMap_ from '../dist/react-client-manifest.json'

const manifest = {}
const componentRegex = /src\/.+\.js/

// We need to remap the filepaths in the manifest
// because they have different working directory
// inside the function.
for (let key in moduleMap_) {
    const componentPath = key.match(componentRegex)[0]
    manifest[componentPath] = moduleMap_[key]
}
const moduleMap = new Proxy(manifest, {
    get: function (target, prop) {
        const match = prop.match(componentRegex)
        const componentPath = match && match[0]
        return target[componentPath]
    },
})

exports.handler = async function(event, context) {
    const writer = new streams.WritableStream();
    const location = JSON.parse(event.queryStringParameters.location);

    console.log("Notes URL: ", process.env.URL + "/notes")

    return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve({
            statusCode: 200,
            body: writer.toString(),
            headers: {'Content-Type': 'application/text', 'X-Location': JSON.stringify(location)}
        }))
        pipeToNodeWritable(React.createElement(App, location), writer, moduleMap)
    })
}