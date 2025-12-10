import fs from 'fs';

export function leerTarjetas() {
    if (!fs.existsSync('Data/Data.json')) {
        console.log(' No hay tarjetas registradas');
        return;
    }

    const contenido = fs.readFileSync('Data/Data.json', 'utf8');
    const tarjetas = JSON.parse(contenido);

    console.log('\n Lista de tarjetas de regalo:');
    console.log('===============================');
    
    if (tarjetas.items.length === 0) {
        console.log('No hay tarjetas');
    } else {
        tarjetas.items.forEach(t => {
            console.log(`\nID: ${t.id}`);
            console.log(`Nombre: ${t.nombre}`);
            console.log(`Precio: $${t.precio}`);
            console.log(`Creada en: ${t.createdAt}`);
            console.log('---');
        });
    }
}

export function leerTarjetaPorId(id) {
    if (!fs.existsSync('Data/Data.json')) {
        console.log(' No hay tarjetas registradas');
        return;
    }

    const contenido = fs.readFileSync('Data/Data.json', 'utf8');
    const tarjetas = JSON.parse(contenido);
    const tarjeta = tarjetas.items.find(t => t.id === id);

    if (tarjeta) {
        console.log('\n Tarjeta encontrada:');
        console.log('======================');
        console.log(`ID: ${tarjeta.id}`);
        console.log(`Nombre: ${tarjeta.nombre}`);
        console.log(`Precio: $${tarjeta.precio}`);
        console.log(`Creada en: ${tarjeta.createdAt}`);
    } else {
        console.log(` Tarjeta con ID ${id} no encontrada`);
    }
}
