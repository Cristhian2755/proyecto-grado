const connectDatabase = require("../config/database");

const usuarios = require("../collections/usuarios.collection");
const proyectos = require("../collections/proyectos.collection");
const revisiones = require("../collections/revisiones.collection");
const notificaciones = require("../collections/notificaciones.collection");
const roles = require("../collections/roles.collection");
const lineas = require("../collections/lineasTematicas.collection");

async function seedDatabase(){

const db = await connectDatabase();

await roles(db);
await usuarios(db);
await proyectos(db);
await revisiones(db);
await notificaciones(db);
await lineas(db);

console.log("Base de datos inicializada");

process.exit();

}

seedDatabase();