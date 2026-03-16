async function createProyectosCollection(db) {

    const proyectosCollection = db.collection("proyectos");

    await proyectosCollection.createIndex({ titulo: 1 });

    await proyectosCollection.createIndex({ estudiante_id: 1 });

    await proyectosCollection.createIndex({ linea_tematica_id: 1 });

    console.log("Colección proyectos lista");

}

module.exports = createProyectosCollection;