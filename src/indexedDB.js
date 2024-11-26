import { openDB } from 'idb';

// Database name and store configuration
const dbName = 'todoDB';
const storeName = 'todos';

// Initialize IndexedDB
export const initDB = async () => {
  return openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

// CRUD Operations
export const addTodo = async (todo) => {
  const db = await initDB();
  const tx = db.transaction(storeName, 'readwrite');
  await tx.store.add(todo);
  await tx.done;
};

export const getTodos = async () => {
  const db = await initDB();
  return await db.getAll(storeName);
};

export const updateTodo = async (id, updatedFields) => {
  const db = await initDB();
  const tx = db.transaction(storeName, 'readwrite');
  const todo = await tx.store.get(id);
  Object.assign(todo, updatedFields);
  await tx.store.put(todo);
  await tx.done;
};

export const deleteTodo = async (id) => {
  const db = await initDB();
  const tx = db.transaction(storeName, 'readwrite');
  await tx.store.delete(id);
  await tx.done;
};
