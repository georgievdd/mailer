import server from './server'
import db from './db'
db().then(server)
