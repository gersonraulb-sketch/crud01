import http from 'http';
import { crearTarjeta } from './C.js';
import { leerTarjetas, leerTarjetaPorId } from './R.js';
import { editarTarjeta } from './U.js';
import { borrarTarjeta } from './D.js';

const server = http.createServer((req, res) => {
    const url = req.url;

    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        if (url === '/crear') {
            const datos = JSON.parse(body || '{}');

            crearTarjeta(datos);
            res.end('Tarjeta de regalo creada');
        }   else if (url === '/leer') {
            leerTarjetas();
            res.end('Tarjetas de regalo disponibles (Impreso en la consola)');
        }   else if (url.startsWith('/leer/')) {
            const id = parseInt(url.split('/')[2]);

            leerTarjetaPorId(id);
            res.end(`Tarjeta ${id} leida (Impreso en la consola)`);
        }   else if (url.startsWith('/editar/')) {
            const id = parseInt(url.split('/')[2]);
            const datos = JSON.parse(body || '{}');

            editarTarjeta(id, datos);
            res.end(`Tarjeta ${id} editada`);
        }   else if (url.startsWith('/borrar/')) {
            const id = parseInt(url.split('/')[2]);
            
            borrarTarjeta(id);
            res.end(`Tarjeta ${id} borrada`);
        }   else {
            res.end('Ruta no encontrada');
        }
    });
});

server.listen(3000, () => {
    console.log('Servidor HTTP en http://localhost:3000');
    console.log('\ Rutas disponibles:');
    console.log('  /crear          - Crear tarjeta de regalo');
    console.log('  /leer           - Leer todas las tarjetas');
    console.log('  /leer/:id       - Leer una tarjeta por ID');
    console.log('  /editar/:id     - Editar tarjeta');
    console.log('  /borrar/:id     - Borrar tarjeta');
});
