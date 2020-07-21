import '@babel/polyfill';

import app from './server';


async function main() {
    await app.listen(app.get('port'));
    console.log('Servidor en puerto ', app.get('port'));
}

main();