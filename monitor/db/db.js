const redis = require('redis');
const redisClient = redis.createClient();
const data = require('../db/db.json');

exports.getVoteResult = () => {
    
}

exports.setVoteNumber = (userid) => {

}


// redisClient.set('data',JSON.stringify(data));
// redisClient.get('data',(err, data) => {
//     console.log(data);
// })
// redisClient.set('test','hi');
// redisClient.get('test',(err, data) => {
//     console.log(data);
// })
// redisClient.hset('user','name','zhoujl');
// redisClient.hget('user','name',(err, data) => {
//   console.log(data);  
// });
// redisClient.hset('user','age',30);
// redisClient.hget('user','age',(err, data) => {
//     console.log(data);
// })
// redisClient.hmset('user',['age','20','city','beijing']);
// redisClient.hmget('user',['city','name'],(err, data) => {
//     console.log(data);
// })
// redisClient.lpush('city',['beijing','shanghai']);