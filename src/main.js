import jsonServer from 'json-server'
import bodyParser from 'body-parser'
import data from './data'
import auth from './auth'

data.generateDb();

export default {
    server: jsonServer.create(),
}