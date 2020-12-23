const React = require('react');
const {pipeToNodeWritable} = require('react-server-dom-webpack/writer.node.server');

const App = (props) => {
    return React.createElement('h2', null, "Hello, Server World!")
}

class Writer {
    constructor() {
        this.buffer = [];
        this.result;
        this.handlers = {}
    }
    write(s) {
        console.log("Pushing")
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
    return new Promise((resolve, reject) => {
        writer.on('done', (result) => resolve({
            statusCode: 200,
            body: result,
            headers: {'Content-Type': 'application/text'}
        }))
        pipeToNodeWritable(React.createElement(App, {}), writer, {})
    })
}