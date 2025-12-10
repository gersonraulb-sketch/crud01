import fs from 'fs';

export function borrarTarjeta(id) {
    if (!fs.existsSync('Data/Data.json')) {
        console.log(' No hay tarjetas registradas');
        return;
    }

    const contenido = fs.readFileSync('Data/Data.json', 'utf8');
    const tarjetas = JSON.parse(contenido);
    const index = tarjetas.items.findIndex(t => t.id === id);

    if (index === -1) {
        console.log(` Tarjeta con ID ${id} no encontrada`);
        return;
    }

    const eliminada = tarjetas.items.splice(index, 1)[0];

    fs.writeFileSync('Data/Data.json', JSON.stringify(tarjetas, null, 2));
    console.log('✅ Tarjeta eliminada:', eliminada);
}
