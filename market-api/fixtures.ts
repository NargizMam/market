import mongoose from 'mongoose';
import config from './config';
import Category from './models/Category';
import Product from './models/Product';
import User from './models/User';

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing. skipping drop ...`);
  }
};
const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;
  const collections = ['categories', 'users', 'products'];
  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }
  const [user1, user2] = await User.create(
    {
      username: 'Misha',
      password: '123',
      token: crypto.randomUUID(),
      displayName: 'Misha RC',
      phoneNumber: '099999999999',
    },
    {
      username: 'Ninini',
      password: '123',
      token: crypto.randomUUID(),
      displayName: 'Nina Ursum',
      phoneNumber: '0555555555',
    },
  );
  const [category1, _category2, _category3, category4, _category5] = await Category.create(
    {
      title: 'computers',
    },
    {
      title: 'things',
    },
    {
      title: 'toys',
    },
    {
      title: 'equipment',
    },
    {
      title: 'another',
    },
  );
  const [] = await Product.create(
    {
      category: category1._id,
      title: 'Lenovo',
      price: 500,
      description:
        'Характеристики ; Гарантия. 1 год ; Диагональ/разрешение. 15.6"/1366x768 пикс. ; Процессор. Intel Celeron N3350 1.1 ГГц ; Оперативная память (RAM). 4 ГБ ',
      image: 'fixtures/lenovo.jpeg',
      salesman: user1.id,
    },
    {
      category: category1._id,
      title: 'MacBook Pro 14',
      price: 500,
      description:
        'CPU. У обоих 10 ядер, но в Max более высокие тактовые частоты. Следовательно, обеспечивается более высокая производительность в задачах, которые требуют многозадачности и вычислительной мощности.',
      image: 'fixtures/mack.jpg',
      salesman: user2.id,
    },
    {
      category: category4._id,
      title: 'ДУХОВОЙ ШКАФ ',
      price: 5000,
      description:
        'Духовка электрическая независимая\n' +
        'Объём 58 л\n' +
        'Энергопотребление класс A, мощность подключения 3.10 кВт\n' +
        'Размеры (ВхШхГ) 60 х 59.6 x 60 см',
      image: 'fixtures/mashina.jpg',
      salesman: user1.id,
    },
    {
      category: category4._id,
      title: 'ОЧИСТИТЕЛЬ ВОЗДУХА XIAOMI ',
      price: 5000,
      description:
        'Управление электронное\n' +
        'Индикация включения, влажности, загрязнения фильтра, загрязненности воздуха, температуры, включения; загрязнения фильтра',
      image: 'fixtures/o2.jpg',
      salesman: user2.id,
    },
  );

  await db.close();
};

void run();
