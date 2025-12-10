import fs from 'fs';

export function editarTarjeta(id) {
    if (!fs.existsSync('Data/Data.json')) {
        console.log('❌ No hay tarjetas registradas');
        return;
    }

    const contenido = fs.readFileSync('Data/Data.json', 'utf8');
    const tarjetas = JSON.parse(contenido);
    const index = tarjetas.items.findIndex(t => t.id === id);

    if (index === -1) {
        console.log(`❌ Tarjeta con ID ${id} no encontrada`);
        return;
    }

    const nombresAleatorios = [
        'Tarjeta Navidad',
        'Tarjeta Cumpleaños',
        'Tarjeta Premium',
        'Tarjeta Descuento',
        'Tarjeta Especial'
    ];
    const nombreRandom = nombresAleatorios[Math.floor(Math.random() * nombresAleatorios.length)];
    const precioRandom = Math.floor(Math.random() * 7000) + 10000; 

    tarjetas.items[index] = {
        ...tarjetas.items[index],
        nombre: nombreRandom,
        precio: precioRandom,
        id: id,
        updatedAt: new Date().toISOString()
    };

    // Guardar cambios
    fs.writeFileSync('Data/Data.json', JSON.stringify(tarjetas, null, 2));
    console.log('✅ Tarjeta actualizada con valores aleatorios:', tarjetas.items[index]);
}
