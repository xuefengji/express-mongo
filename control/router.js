var db = require('../modle/db.js');
var formidable = require('formidable');
var ObjectID = require('mongodb').ObjectID;




exports.showIndex = function (req,res){
    db.getAllCount('test','student',function (count) {
        res.render('index',{'pageamount':Math.ceil(count/10)});
    })

}


exports.insert = function (req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req,function (err,fields) {
        db.insertOne('test','student',{'xingming':fields.xingming,
                'liuyan':fields.liuyan,'shijian':fields.shijian},
            function (err,result) {
            if (err){
                res.json(0);
            }
                res.json(1);
            });
        // console.log(fields);
    })

}

exports.find = function (req,res) {
    var page = parseInt(req.query.page);
    // console.log(page);
    db.find('test'
        ,'student'
        ,{}
        ,{'sort':{'shijian':-1},'pageamount':10,'page':page}
        ,function (err,result) {
        res.json({'result':result});
    });
}

exports.delete = function (req,res) {
    id = req.query.id;
    db.delete('test',
        'student',
        {'_id':ObjectID(id)},
        function (err,result) {
            res.redirect('/');
        })

}

exports.update = function (req,res) {
    db.update('test',
        'student',
        {'name':'xiaoming'},
        {$set:{'name':'xiaozhang'}},
        function (err,result) {
            res.send(result);
        })
}