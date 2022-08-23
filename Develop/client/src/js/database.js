import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('put db started');
  try{
    const db = await openDB('JATE', 1)
    const transaction = db.transaction('JATE', 'readwrite')
    const store = transaction.objectStore('JATE')
    await store.put({id: 1, content})
    console.log(content);
  }catch(err){
    console.error(`putDB error ${err}`)
    throw err
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try{
    const db = await openDB('JATE', 1)
    const transaction = db.transaction('JATE', 'readwrite')
    const store = transaction.objectStore('JATE')
    console.log('get request sucessful')
    return await store.getAll(1)
  }catch(err){
    console.error(`getDB error ${err}`)
    throw err
  }
};

initdb();
