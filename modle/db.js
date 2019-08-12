
var MongoClient = require("mongodb").MongoClient;


//连接数据库
function __connectDB(callback) {
    var url = 'mongodb://localhost:27017';
    var client = new MongoClient(url);
    client.connect(function (err) {
        if (err){
            callback(err,null);
            return;
        }
        callback(err,client);
    });
}




//插入数据
exports.insertOne = function (dbName,collectionName, josn, callback) {
    __connectDB(function (err, client) {
        client.db(dbName)
            .collection(collectionName)
            .insertOne(josn, function (err,result) {
                if (err){
                    callback(err,null);
                    client.close();
                    return;
                }
            callback(err,result);
            client.close();
        })
    })
}


//查找数据
exports.find = function (dbName, collectionName, json, C, D) {

    if (arguments.length == 4){
        var callback = C;
        var skipNumber =  0;
        var limit = 0;
    }
    else if (arguments.length == 5){
        var args = C;
        var callback = D;
        //应省略的条数
        var skipNumber =  args.pageamount * args.page || 0;
         //数目限制
        var limit = args.pageamount || 0;
        //排序方式
        var sort = args.sort || {}
    }
    else{
        throw new Error("find函数的参数个数，必须是4个，或者5个。");
        return;
    }

    __connectDB(function (err, client) {
        client.db(dbName)
            .collection(collectionName)
            .find(json)
            .skip(skipNumber)
            .limit(limit)
            .sort(sort)
            .toArray(function (err,docs) {
            if(err){
                callback(err,null);
                client.close();
                return;
            }
            callback(err,docs);
            client.close();
        })
    })
}

//删除数据
exports.delete = function (dbName,collectionName, josn, callback) {
    __connectDB(function (err,client) {
        client.db(dbName)
            .collection(collectionName)
            .deleteMany(josn,function (err,result) {
                if(err){
                    callback(err,null);
                    client.close();
                    return;
                }
                callback(err,result);
                client.close();
            })
        
    })
}

//修改数据
exports.update = function (dbName,collectionName, josn1, josn2,callback) {
    __connectDB(function (err,client) {
        client.db(dbName)
            .collection(collectionName)
            .updateMany(josn1,josn2,function (err,result) {
                if (err){
                    callback(err,null);
                    client.close();
                    return;
                }
                callback(err,result);
            })

    })
}


//获取全部数据
exports.getAllCount = function (dbName,collectionName,callback) {
    __connectDB(function (err,client) {
        client.db(dbName).collection(collectionName).count({}).then(function (count) {
            callback(count);
            client.close();
        });
    })
}