async function createLineasTematicasCollection(db) {

    const lineasCollection = db.collection("lineas_tematicas");

    const lineas = [
        { nombre: "Redes" },
        { nombre: "Seguridad Informatica" },
        { nombre: "Desarrollo de Software" },
        { nombre: "Infraestructura Tecnologica" }
    ];

    const existing = await lineasCollection.find().toArray();

    if (existing.length === 0) {

        await lineasCollection.insertMany(lineas);

        console.log("Colección lineas_tematicas creada con datos");

    } else {

        console.log("Colección lineas_tematicas ya contiene datos");

    }

}

module.exports = createLineasTematicasCollection;