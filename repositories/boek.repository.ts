import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db("LU1_Database");
const collection = db.collection("catalogus");

export const BookRepository = {
  async getById(bookId: string) {
    await client.connect();

    const book = await collection.findOne({ _id: new ObjectId(bookId) });

    if (!book) return null;

    return {
      Titel: book.Titel,
      Auteur: book.Auteur,
      type: book["Type materiaal"],
      niveau: book.Niveau,
      thema: book.Themas_boek,
      beschrijving: book["Korte omschrijving"]
    };
  },

  async getFiltered(filters: any) {
    await client.connect();
    return collection.find(filters).limit(10).toArray();
  }
};



