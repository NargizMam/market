import mongoose from "mongoose";
import config from "./config";
import Category from "./models/Category";

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
    try {
        await db.dropCollection(collectionName);
    }
    catch (e) {
        console.log(`Collection ${collectionName} was missing. skipping drop ...`)
    }
};
const run = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;
    const collections = ['categories'];
    for (const collectionName of collections) {
        await dropCollection(db, collectionName)
    }
    const [] = await Category.create(
        {
            title: 'computers'
        },
        {
            title: 'things'
        },
        {
            title: 'toys'
        },
        {
            title: 'equipment'
        },
        {
            title: 'another'
        },


    );

    await db.close();
};

void run();

