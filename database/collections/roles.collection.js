async function createRolesCollection(db) {

    const rolesCollection = db.collection("roles");

    const roles = [
        { nombre: "estudiante" },
        { nombre: "asesor" },
        { nombre: "jurado" },
        { nombre: "coordinador" }
    ];

    const existingRoles = await rolesCollection.find().toArray();

    if (existingRoles.length === 0) {

        await rolesCollection.insertMany(roles);

        console.log("Colección roles creada y datos insertados");

    } else {

        console.log("Colección roles ya contiene datos");

    }

}

module.exports = createRolesCollection;