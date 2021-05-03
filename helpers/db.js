import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL, userId TEXT NOT NULL)',
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err)
                }
            );
            
        });
    })
    return promise;
}

export const insertPlace = (title, imageUri, addres, lat, lng, userId) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO places (title, imageUri, address, lat, lng, userId) VALUES (?, ?, ?, ?, ?, ?);',
                [title, imageUri, addres, lat, lng, userId],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err)
                }
            );
            
        });
    })
    return promise;
}

export const fetchPlaces = (userId) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM places WHERE userId=?;',
                [userId],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err)
                }
            );
            
        });
    })
    return promise;
}

export const deletePlace = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM places WHERE id=?;',
                [id],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err)
                }
            );
            
        });
    })
    return promise;
}

