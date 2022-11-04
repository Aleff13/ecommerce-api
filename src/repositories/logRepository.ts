import database from "./database";

const logRepository = {
    newLog: (log: string, callback: (id?: number) => void) => {
        const sql = 'INSERT INTO log (value) VALUES (?)'
        const params = [log]
        database.run(sql, params, function (err) {
            callback(this?.lastID)
        })
    }
}

export default logRepository

