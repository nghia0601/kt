const { Console } = require('console');
const fs = require('fs');

function PageHienThiSP(res) {
    let data = fs.readFileSync('HTML/HienThiSP.html', 'utf-8');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
  }
function PageNew(res) {
    let data = fs.readFileSync('HTML/ThemMoi.html', 'utf-8');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
  }
function PageEdit(maSanPham, ID, Gia, TenSP, MoTa,res) {
    let data = fs.readFileSync('HTML/SuaSanPham.html', 'utf-8');
    res.writeHead(200, {'Content-Type': 'text/html'});
    data = insertMaSP(maSanPham, data);
    data = insertID(ID, data);
    data = insertGia(Gia, data);
    data = insertTenSP(TenSP, data);
    data = insertMota(MoTa, data);   
    res.write(data);
  }
  function insertMaSP(maSanPham, data) {
    let strInputMaSP = '<input type="text" name="maSanPham" />';
    let indexMaSP = data.indexOf(strInputMaSP) + 7;
    return data.substr(0, indexMaSP) + `value='${maSanPham}'` + data.substr(indexMaSP);
  }
  function insertID(ID, data) {
    let strInputID = '<input type="text" name="ID" />';
    let indexID = data.indexOf(strInputID) + 7;
    return data.substr(0, indexID) + `value='${ID}'` + data.substr(indexID);
  }
  function insertTenSP(tenSanPham, data) {
    let strInputTenSP = '<input type="text" name="TenSP" />';
    let indexTenSP = data.indexOf(strInputTenSP) + 7;
    return data.substr(0, indexTenSP) + `value='${tenSanPham}'` + data.substr(indexTenSP);
  }
  function insertGia(Gia, data) {
    let strInputGia = '<input type="text" name="Gia" />';
    let indexGia = data.indexOf(strInputGia) + 7;
    return data.substr(0, indexGia) + `value='${Gia}'` + data.substr(indexGia);
  }
  function insertMota(Mota, data) {
    let strInputMoTa = '<input type="text" name="MoTa" />';
    let indexMota = data.indexOf(strInputMoTa) + 7;
    return data.substr(0, indexMota) + `value='${Mota}'` + data.substr(indexMota);
  }
  
function writeItemTable(obj, res) {
    res.write('<table class="table table-striped table-bordered table-list" border="1px solid black" style="margin-left:250px;width:80%;">');
    res.write('<thead> <tr><th>MaSP</th> <th>ID</th><th style="width:auto;">Ten SP</th> <th style="width:auto;">Mo Ta</th><th style="width:auto;">Gia</th>');
    if (obj.err) {
      res.write(`<h5 style="color:red;">Error:: ${obj.err}</h5>`);
      res.write('<tr><td colspan="5">Nothing to show</td></tr>');
    } else {
      if (obj.data.Items.length === 0) {
        res.write('<tr><td colspan="5">Nothing to show</td></tr>');
      }
      obj.data.Items.forEach((sanpham) => {
        res.write(`<tr>
        <td >${sanpham.maSanPham}</td>
        <td >${sanpham.ID}</td>
        <td>${sanpham.TenSP}</td>
        <td>${sanpham.MoTa}</td>
        <td>${sanpham.Gia}</td>
        <td><input name="SoLuong" type="number" id="${dt.MaDienThoai}" value="1"/></td>
        <td><button onclick="AddCart('${dt.MaDienThoai}', '${dt.MaSo}','${dt.TenDienThoai}', '${dt.Gia}')">Chọn</button></td>`);
        res.write(`<td><a href="/edit?maSanPham=${sanpham.maSanPham}&ID=${sanpham.ID}&TenSP=${sanpham.TenSP}&MoTa=${sanpham.MoTa}&Gia=${sanpham.Gia}">Sửa</a></td>`);
        res.write(`<td><a href="/delete?maSanPham=${sanpham.maSanPham}&ID=${sanpham.ID}">Xóa</a></td>`);  
      });
    }
    res.write('</table>' );
    res.end();
  }

  function writeItemTable(obj, res) {
    res.write('<table class="table table-striped table-bordered table-list" border="1px solid black" style="margin-left:50px;width:80%;">');
    res.write('<thead> <tr><th>MaSP</th> <th>ID</th><th style="width:auto;">Ten SP</th> <th style="width:auto;">Mo Ta</th><th style="width:auto;">Gia</th><th>So Luong</th>');
    if (obj.err) {
      res.write(`<h5 style="color:red;">Error:: ${obj.err}</h5>`);
      res.write('<tr><td colspan="5">Nothing to show</td></tr>');
    } else {
      if (obj.data.Items.length === 0) {
        res.write('<tr><td colspan="5">Nothing to show</td></tr>');
      }
      obj.data.Items.forEach((sanpham) => {
        res.write(`<tr>
        <td >${sanpham.maSanPham}</td>
        <td >${sanpham.ID}</td>
        <td>${sanpham.TenSP}</td>
        <td>${sanpham.MoTa}</td>
        <td>${sanpham.Gia}</td> 
        <td><input name="SoLuong" type="number" id="${sanpham.maSanPham}" value="1"/></td>
        <td><button onclick="AddCart('${sanpham.maSanPham}', '${sanpham.ID}','${sanpham.TenSP}', '${sanpham.Gia}')">Chọn</button></td>`  
        );
         res.write(`<td><a href="/edit?maSanPham=${sanpham.maSanPham}&ID=${sanpham.ID}&TenSP=${sanpham.TenSP}&MoTa=${sanpham.MoTa}&Gia=${sanpham.Gia}">Sửa</a></td>`);
         res.write(`<td><a href="/delete?maSanPham=${sanpham.maSanPham}&ID=${sanpham.ID}">Xóa</a></td>`);  
      });
    }
    res.write('</tr></table>' );
    res.end();
  }

  function writeItemTableGioHang(o,obj, res){
    res.write(`<table style="border: 1px solid;">
    <tr>
        <th style="border: 1px solid;">Mã Sản Phẩm</th>
        <th style="border: 1px solid;">ID</th>
        <th style="border: 1px solid;">Tên sản phẩm</th>
        <th style="border: 1px solid;">Mô Tả</th>
        <th style="border: 1px solid;">Giá</th>
    </tr>`);
    if(obj.err){
      res.write(`<h5 style="background:red;">Không thể kết nối đến CSDL</h5>`)
    }
    else{
      if(obj.data.Items.length===0){
        res.write(`<h5 style="background:red;">Chưa có dữ liệu</h5>`)
      }
      obj.data.Items.forEach((sp)=>{
        res.write(`<tr>
        <td>${sp.maSanPham}</td>
        <td>${sp.ID}</td>
        <td>${sp.TenSP}</td>
        <td>${sp.MoTa}</td>
        <td>${sp.Gia}</td>
        <td><input name="SoLuong" type="number" id="${sp.maSanPham}" value="1"/></td>
        <td><button onclick="AddCart('${sp.maSanPham}', '${sp.ID}','${sp.TenSP}', '${sp.Gia}')">Chọn</button></td>
    </tr>`);
      });
      res.write(`</table>`)
    }
    res.write(`<br/><br/>`)
    res.write(`<h2>Giỏ hàng của bạn</h2>`)
    res.write(`<table style="border: 1px solid;">
    <tr>
        <th style="border: 1px solid;">Ma San Pham</th>
        <th style="border: 1px solid;">ID</th>
        <th style="border: 1px solid;">Ten San Pham</th>
        <th style="border: 1px solid;">Số lượng</th>
        <th style="border: 1px solid;">Thành tiền</th>
    </tr>`);
    if(o.data.length===0){
        res.write(`<h5 style="background:red;">Chưa có dữ liệu</h5>`)
      }
      o.data.forEach((sp)=>{
        res.write(`<tr>
        <td>${sp.maSanPham}</td>
        <td>${sp.ID}</td>
        <td>${sp.TenSP}</td>
        <td>${sp.SoLuong}</td>
        <td>${sp.Gia*sp.SoLuong}</td>
        <td><a href="/XoaSanPham?maSanPham=${sp.maSanPham}">Xóa</a></td>
    </tr>`);
      });
      res.write(`</table>`)
  }

  module.exports = {
    PageHienThiSP:PageHienThiSP,
    writeItemTable:writeItemTable,
    PageNew:PageNew,
    PageEdit:PageEdit,
    writeItemTableGioHang:writeItemTableGioHang
}