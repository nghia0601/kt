const http = require('http');
const url = require('url');
const port = 3000;
const FORM = require('./Write');
const DATA = require('./aws');
const API = require('./api');
const express = require('express');
const app=express();

let o={};
let giohang=[];

//  app.use('/',API);
//  app.use('/new',API);
//  app.use('/saveNew',API);
//  app.use('/delete',API);
//  app.use('/save',API);
//  app.use('/Chon',API)
//  app.use('/XoaSanPham',API)
//  app.use('/TimKiem',API)

app.get('/Chon',function(req,res){
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
      DATA.getDataWithGioHang(o,res);
})
app.get('/XoaSanPham',function(req,res){
    let maSanPham=req.query.maSanPham;
    o.data.forEach((dtgh)=>{
        if(dtgh.maSanPham===maSanPham){
            giohang = giohang.filter(item => item !== dtgh);
        }
    });
    o.data=giohang;
    FORM.PageHienThiSP(res);
    DATA.getDataWithGioHang(o,res);
})
app.get('/',function(req,res){
    FORM.PageHienThiSP(res);
    DATA.getAllItem(res);
})
app.get('/new',function(req,res){
    FORM.PageNew(res);
    res.end;
})
app.get('/saveNew',function(req,res){
    var maSanPham = req.query.maSanPham;
    var ID = req.query.ID;
    var Gia = req.query.Gia;
    var TenSP = req.query.TenSP;
    var MoTa = req.query.MoTa;
    DATA.createItem(maSanPham,ID,Gia,TenSP,MoTa,res);
})
app.get('/delete',function(req,res){
    var maSanPham = req.query.maSanPham;
    var ID = req.query.ID;
    DATA.deleteItem(maSanPham,ID,res);
})

app.get('/save',function(req,res){
    var maSanPham = req.query.maSanPham;
    var ID = req.query.ID;
    var Gia = req.query.Gia;
    var TenSP = req.query.TenSP;
    var MoTa = req.query.MoTa;
    DATA.updateItem(maSanPham,ID,Gia,TenSP,MoTa,res);
})
app.get('/edit',function(req,res){
    var maSanPham = req.query.maSanPham;
    var ID = req.query.ID;
    var Gia = req.query.Gia;
    var TenSP = req.query.TenSP;
    var MoTa = req.query.MoTa;
    FORM.PageEdit(maSanPham,ID,Gia,TenSP,MoTa,res);
})
app.get('/TimKiem',function(req,res){
    var TenSP= req.query.TenSP;
    DATA.searchItem(TenSP,res);
})
app.listen(port,function(){
    console.log(`Server starting at port ${port} `);
})
