const AWS = require('aws-sdk');
const FORM = require('./Write');
const express = require('express');
const router = express.Router();
AWS.config.update({
  "region": "us-east-2",
  "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
  "accessKeyId": "", "secretAccessKey": ""
});
let docClient = new AWS.DynamoDB.DocumentClient();
router.get('/',(req,res) => {
    FORM.PageHienThiSP(res);
    let params = {
      TableName: "SanPhams"
    };
    let scanObject = {};
    docClient.scan(params, (err, data) => {
      if (err) {
        scanObject.err = err;
      } else {
        scanObject.data = data;
      }
      FORM.writeItemTable(scanObject, res);
    });
  });
 router.get('/new',(req,res) => {
  FORM.PageNew(res);
  });

router.get('/saveNew',(req,res) =>{
  var maSanPham = req.query.maSanPham;
  var ID = req.query.ID;
  var Gia = req.query.Gia;
  var TenSP = req.query.TenSP;
  var MoTa = req.query.MoTa;
    let params = {
      TableName: 'SanPhams',
      Item: {
        "maSanPham":String(maSanPham),
        "ID":String(ID),
        "Gia":Number(Gia),
        "TenSP":String(TenSP),
        "MoTa":String(MoTa)
      }
    };
    docClient.put(params, (err, data) => {
      if (err) {
        FORM.PageNew(res);
        res.write('<h5 style="color:red;">Vui lòng nhập đủ các thuộc tính</h5>');
      } else {
        res.writeHead(302, {'Location': '/'});
      }
      res.end();
    });
});
router.get('/delete',(req,res)=>{
  var maSanPham = req.query.maSanPham;
  var ID = req.query.ID;
  let params = {
    TableName: 'SanPhams',
    Key:{
      "maSanPham": String(maSanPham),
      "ID": String(ID)
    }
  };

  docClient.delete(params, (err, data) => {
    if (err) {
      console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      res.writeHead(302, {'Location': '/'});
    }
    res.end();
  });
})
router.get('/edit',(req,res)=>{
    var maSanPham = req.query.maSanPham;
    var ID = req.query.ID;
    var Gia = req.query.Gia;
    var TenSP = req.query.TenSP;
    var MoTa = req.query.MoTa;
    FORM.PageEdit(maSanPham,ID,Gia,TenSP,MoTa,res);
})
router.get('/save',(req,res)=>{
    var maSanPham = req.query.maSanPham;
    var ID = req.query.ID;
    var Gia = req.query.Gia;
    var TenSP = req.query.TenSP;
    var MoTa = req.query.MoTa;
    let params = {
      TableName: 'SanPhams',
      Key:{
        "maSanPham": String(maSanPham),
        "ID": String(ID)
      },
      UpdateExpression: "set #gia=:Gia, #tensp=:TenSP, #mota=:MoTa ",
      ExpressionAttributeNames: {
        '#gia':'Gia',
        '#tensp':'TenSP',
        '#mota':'MoTa'
      },
      ExpressionAttributeValues:{
        ':Gia':Number(Gia),
        ':TenSP':String(TenSP),
        ':MoTa':String(MoTa)
      },
      ReturnValues:"UPDATED_NEW"
    };
    docClient.update(params, (err, data) => {
      if (err) {
        FORM.PageEdit(maSanPham,ID,Gia,TenSP,MoTa, res);
        res.write('<h5 style="color:red;">Vui lòng nhập đủ các thuộc tính</h5>');
      } else {
        res.writeHead(302, {'Location': '/'});
      }
      res.end();
    })
})
let o={};
let giohang=[];
router.get('/Chon',(req,res)=>{
  let maSanPham=req.query.maSanPham;
  let ID=req.query.ID;
  let TenSP=req.query.TenSP;
  let Gia=req.query.Gia;
  let SoLuong=req.query.SoLuong;
  var sp={
      maSanPham:maSanPham,
      ID:ID,
      TenSP:TenSP,
      SoLuong:Number(SoLuong),
      Gia:Number(Gia)
    };
    o.data = giohang;
    if(o.data.length===0){
      giohang.push(sp);
      o.data = giohang;
    }
    else{
      let trung = false;
      o.data.forEach((spgh)=>{
          if(spgh.maSanPham===sp.maSanPham){
              spgh.SoLuong+=sp.SoLuong;
              trung=true;
          }
      });
      if(!trung){
          giohang.push(sp);
          o.data = giohang;
        }
    }
    giohang = o.data;
    FORM.PageHienThiSP(res);


    let params = {
      TableName: "SanPhams"
    };
    let scanObject = {};
    docClient.scan(params, (err, data) => {
      if (err) {
        scanObject.err = err;
      } else {
        scanObject.data = data;
      }
      FORM.writeItemTableGioHang(o,scanObject, res);
    });
})

router.get('/XoaSanPham',(req,res)=>{
  let maSanPham=req.query.maSanPham;
  o.data.forEach((dtgh)=>{
      if(dtgh.maSanPham===maSanPham){
          giohang = giohang.filter(item => item !== dtgh);
      }
  });
  o.data=giohang;
  FORM.PageHienThiSP(res);

  let params = {
    TableName: "SanPhams"
  };
  let scanObject = {};
  docClient.scan(params, (err, data) => {
    if (err) {
      scanObject.err = err;
    } else {
      scanObject.data = data;
    }
    FORM.writeItemTableGioHang(o,scanObject, res);
  });
})
router.get('/TimKiem',(req,res)=>{
  var TenSP= req.query.TenSP;
  let params = {
    TableName: 'SanPhams'
  };
  let queryObject = {};
    if (TenSP) {
      params.FilterExpression = '#tsp = :TenSP';
      params.ExpressionAttributeNames = {'#tsp': 'TenSP'};
      params.ExpressionAttributeValues = {':TenSP': String(TenSP)};
      docClient.scan(params, (err, data) => {
        if (err) {
          queryObject.err = err;
        } else {
          queryObject.data = data;
        } 
        FORM.PageHienThiSP(res);
        FORM.writeItemTable(queryObject, res);
      });
    }
});
  module.exports = router;
