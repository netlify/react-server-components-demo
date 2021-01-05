import serverComponent from '../src/lib/server-component';

exports.handler = async function(event, context) {
    const location = JSON.parse(event.queryStringParameters.location);

    return serverComponent(location, null)
}