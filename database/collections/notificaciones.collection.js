async function createNotificacionesCollection(db) {

    const notificacionesCollection = db.collection("notificaciones");

    await notificacionesCollection.createIndex({ usuario_id: 1 });

    console.log("Colección notificaciones lista");

}

module.exports = createNotificacionesCollection;