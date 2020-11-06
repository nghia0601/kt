var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    "region": "us-east-2",
    "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": "", "secretAccessKey": ""
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "SanPhams",
    KeySchema: [       
        { AttributeName: "maSanPham", KeyType: "HASH"}, 
        { AttributeName: "ID", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [       
        { AttributeName: "maSanPham", AttributeType: "S" },
        { AttributeName: "ID", AttributeType: "S" },
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});

 var docClient = new AWS.DynamoDB.DocumentClient();

var AllSanPham = JSON.parse(fs.readFileSync('LoadDataSP.json', 'utf8'));
AllSanPham.forEach(function(sanPham) {
    var paramsput = {
        TableName: "SanPhams",
        Item: {
            "maSanPham":sanPham.maSanPham,
            "ID":sanPham.ID,
            "Gia":sanPham.Gia,
            "TenSP":sanPham.TenSP,
            "MoTa":sanPham.MoTa
        }
    };

    docClient.put(paramsput, function(err, data) {
       if (err) {
           console.error("khong the them San Pham", sanPham.Ten, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", sanPham.Ten);
       }
    });
});