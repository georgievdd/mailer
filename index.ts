import server from './server'
import database from './db'
database().then(server)
