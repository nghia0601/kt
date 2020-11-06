const AWS = require('aws-sdk');
const FORM = require('./Write');

AWS.config.update({
  "region": "us-east-2",
  "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
  "accessKeyId": "", "secretAccessKey": ""
});
let docClient = new AWS.DynamoDB.DocumentClient();
function getAllItem(res) {
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
  }

  function getDataWithGioHang(o,res){
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
}

  function createItem(maSanPham, ID,Gia,TenSP,MoTa, res) {
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
  }
  function deleteItem(maSanPham,ID,res) {
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
  }
  function updateItem(maSanPham, ID,Gia,TenSP,MoTa, res) {
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
  }
  function searchItem(TenSP, res) {
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
  }
  module.exports = {
    getAllItem:getAllItem,
    createItem:createItem,
    deleteItem:deleteItem,
    updateItem:updateItem,
    getDataWithGioHang:getDataWithGioHang,
    searchItem:searchItem
  }