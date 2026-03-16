async function createRevisionesCollection(db) {

    const revisionesCollection = db.collection("revisiones");

    await revisionesCollection.createIndex({ proyecto_id: 1 });

    await revisionesCollection.createIndex({ revisor_id: 1 });

    console.log("Colección revisiones lista");

}

module.exports = createRevisionesCollection;