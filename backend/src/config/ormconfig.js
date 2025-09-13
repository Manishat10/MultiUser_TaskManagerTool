
require('dotenv').config();
const {DataSource}=require('typeorm');

const AppDataSource=new DataSource({
  type:'postgres',
  username: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password:process.env.DB_PASSWORD,
  port:process.env.DB_PORT,
  entities:[
    __dirname + '/../entities/*.js'
  ],
  synchronize:true,
});
module.exports=AppDataSource;