import React from 'react';
import {pipeToNodeWritable} from 'react-server-dom-webpack/writer.node.server';
import App from '../src/App.server';

class Writer {
    constructor() {
        this.buffer = [];
        this.result;
        this.handlers = {}
    }
    write(s) {
        this.buffer.push(s.toString())
    }
    end() {
        const handlers = this.handlers.done;
        if (handlers) {
            handlers.forEach((fn) => {
                fn(this.buffer.join())
            })
        }
    }
    on(event, fn) {
        const chain = this.handlers[event] = this.handlers[event] || []
        chain.push(fn)
    }
}

exports.handler = async function(event, context) {
    const writer = new Writer;
    const props = JSON.parse(event.queryStringParameters.props);
    
    return new Promise((resolve, reject) => {
        writer.on('done', (result) => resolve({
            statusCode: 200,
            body: result,
            headers: {'Content-Type': 'application/text', 'X-Props': JSON.stringify(props)}
        }))
        pipeToNodeWritable(React.createElement(App, props), writer, {})
    })
}