import fs from 'fs';

export function crearTarjeta(datos) {
    let tarjetas = { items: [] };
    
    if (fs.existsSync('Data/Data.json')) {
        const contenido = fs.readFileSync('Data/Data.json', 'utf8');
        tarjetas = JSON.parse(contenido);
    }

    const nuevoId = tarjetas.items.length > 0 
        ? Math.max(...tarjetas.items.map(t => t.id)) + 1 
        : 1;

    const nuevaTarjeta = {
        id: nuevoId,
        nombre: datos.nombre || 'Sin nombre',
        precio: datos.precio || 0,
        createdAt: new Date().toISOString()
    };

    tarjetas.items.push(nuevaTarjeta);

    if (!fs.existsSync('Data')) {
        fs.mkdirSync('Data');
    }

    fs.writeFileSync('Data/Data.json', JSON.stringify(tarjetas, null, 2));
    console.log('✅ Tarjeta creada:', nuevaTarjeta);
}
