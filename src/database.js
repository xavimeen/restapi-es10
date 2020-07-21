import MongoClient from 'mongodb';

// Agregar URI de la DB y nombre

export async function connect() {
    try {
        const client = await MongoClient.connect(MONGODB_URI, {
            useUnifiedTopology: true
        });
        const db = client.db(NOMBRE_DB);
        console.log('La DB está conectada');
        return db;
    } catch (error) {
        console.log(error);
    }
}