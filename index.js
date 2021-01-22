const express = require("express");
const mssql = require("mssql");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT||5000;
app.listen(port,function (){
    console.log("Sever đang chạy...")
})
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(bodyParser.urlencoded({extend:true}));
app.use(bodyParser.json());
const config = {
    server:"118.70.125.210",
    user:"sa",
    password:"z@GH7ytQ",
    database:"T2008m_Quang_mipham"
}
mssql.connect(config,function (err){
    if(err) console.log(err);
    else console.log("Connected.......")
})
var rq =new mssql.Request();
app.get("/",function (req,res) {
    res.send("/all" +
        "/thuonghieu" +
        "/danhmuc" +
        "/sanpham" +
        "/allsearch" +
        "/loaisp");

})
app.get("/all",function (req,res){
    rq.query("SELECT * FROM T2008M_Quang_san_pham " +
        "left join T2008M_Quang_thuong_hieu on T2008M_Quang_thuong_hieu.id_thuong_hieu=T2008M_Quang_san_pham.th_id " +
        "left join T2008M_Quang_danh_muc on T2008M_Quang_san_pham.dm_id=T2008M_Quang_danh_muc.id_danh_muc " +
        "left join T2008M_Quang_loai_san_pham on T2008M_Quang_loai_san_pham.dm_id=T2008M_Quang_danh_muc.id_danh_muc",function (err,rows) {
        if(err) res.send("khong the lay du lieu");
        else res.send(rows.recordset);
    })
})
app.get("/thuonghieu",function (req,res){
    var an=req.query.id;
    rq.query("SELECT * FROM T2008M_Quang_thuong_hieu where id_thuong_hieu like '%"+an+"%'",function (err,rows) {
        if(err) res.send("khong the lay du lieu");
        else if( rows.recordset.length>0){
            res.send(rows.recordset);
        }else{
            res.send(false);
        }
    })
})
app.get("/danhmuc",function (req,res){
    rq.query("SELECT * FROM T2008M_Quang_danh_muc",function (err,rows) {
        if(err) res.send("khong the lay du lieu");
        else res.send(rows.recordset);
    })
})
app.get("/sanpham",function (req,res){
    rq.query("SELECT * FROM T2008M_Quang_san_pham",function (err,rows) {
        if(err) res.send("khong the lay du lieu");
        else res.send(rows.recordset);
    })
})
app.get("/loaisp",function (req,res){
    rq.query("SELECT * FROM T2008M_Quang_loai_san_pham",function (err,rows) {
        if(err) res.send("khong the lay du lieu");
        else res.send(rows.recordset);
    })
})
app.get("/allsearch",function (req,res){
    var thamso=req.query.id;
    rq.query("SELECT * FROM T2008M_Quang_san_pham " +
        "left join T2008M_Quang_thuong_hieu on T2008M_Quang_thuong_hieu.id_thuong_hieu=T2008M_Quang_san_pham.th_id " +
        "left join T2008M_Quang_danh_muc on T2008M_Quang_san_pham.dm_id=T2008M_Quang_danh_muc.id_danh_muc " +
        "left join T2008M_Quang_loai_san_pham on T2008M_Quang_loai_san_pham.dm_id=T2008M_Quang_danh_muc.id_danh_muc " +
        " where id_san_pham like '%"+thamso+"%'",function (err,rows) {
        if(err) res.send("khong the lay du lieu");
        else if( rows.recordset.length>0){
            res.send(rows.recordset);
        }else{
            res.send(false);
        }

    })
})