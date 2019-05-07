import dotEnv from 'dotenv';

dotEnv.config();

let env = process.env;
let port = env.DB_PORT || 27017;
let host = env.DB_HOST || 'localhost';

let dbauth = '';
let dbhost = host + ':' + port + '/' + env.DB_NAME;

let apiUser = {};
apiUser[env.API_USER] = env.API_PASS;

if (env.DB_USER && env.DB_USER.length) {
  dbauth = env.DB_USER + ':' + env.DB_PASS + '@';
}

let dbUrl = process.env.MONGODB_URI || 'mongodb://' + dbauth + dbhost;

export { dbUrl, apiUser };
