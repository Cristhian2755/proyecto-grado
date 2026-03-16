async function createUsuariosCollection(db){

const usuarios = db.collection("usuarios");

await usuarios.createIndex({ email: 1 }, { unique: true });

}

module.exports = createUsuariosCollection;