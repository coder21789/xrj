"use strict";
let moment = require('moment');
var path = require("path");
var fs = require('fs');
var thunkify = require('thunkify');
var parse = require('co-busboy');
var paths = path.resolve(path.resolve(__dirname, '..'),'..');
var static_path = path.join(paths,'/static');
var img_type = '.jpg .png .gif .ico .bmp .jpeg';
var files_path = '/upload';

var OSS = require('ali-oss').Wrapper;
var client = new OSS({
  region: 'oss-cn-hangzhou',
  bucket: 'xrj',
  accessKeyId: '',
  accessKeySecret: ''
});

exports.ueditor = function* () {
    if (this.query.action === 'config') {
        this.set("Content-Type","json");
        this.redirect("/ueditor/nodejs/config.json");
    }else if(this.query.action === 'listimage'){
        this.body = yield ue_pic_list(img_path, this.query.start, this.query.size);
    }else if(this.query.action === 'listfile'){
        this.body = yield ue_pic_list(files_path, this.query.start, this.query.size);
    }else if(this.query.action === 'uploadimage' || this.query.action === 'uploadfile'){
        var parts = parse(this);
        var part;
        var stream;
        var file_path;
        var filename;
        while (part = yield parts) {
            if (part.length) {
                var key = part[0];
                var value = part[1];
                // check the CSRF token
                //if (key === '_csrf') this.assertCSRF(value);
            } else {
                var date = moment().format('YYYYMMDD');
                var baseUrl = path.join(static_path,files_path);
                if(this.query.action === 'uploadimage' && img_type.indexOf(path.extname(part.filename)) >= 0 ){
                    filename = (new Date()).getTime()+'_'+part.filename; 
                }else if (this.query.action === 'uploadfile'){
                    filename = (new Date()).getTime()+'_'+part.filename;
                }

                file_path = path.join(baseUrl, filename);
                stream = fs.createWriteStream(file_path);
                part.pipe(stream);

                var img = yield client.putStream('/data/'+date +'/'+filename,  part),
                    src = 'https://img.xinrongnews.com/' + img.name;

                this.body = {
                    'url': src,
                    'title': filename,
                    'original': part.filename,
                    'state': 'SUCCESS'
                }
                fs.unlinkSync(file_path);
            }
        }

    }else{
        this.body = {
            'state': 'FAIL'
        };
    }

}

function *ue_pic_list(list_dir,start,size){
    var list = [];
    var files = yield thunkify(fs.readdir)(path.join(static_path,list_dir));
    for(var i in files ){
        if(i >= start && i < (parseInt(start)+parseInt(size))){
            var file = files[i];
            //if(file_type.indexOf(path.extname(file)) >= 0 ){
            list.push({url:path.join('/',list_dir,file)});
            //}
        }
    }
    return {
        "state": "SUCCESS",
        "list": list,
        "start": start,
        "total": files.length
    }
     this.body = ueditor;
}

exports.ueditor.__method__ = "all";