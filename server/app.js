const http=require('http');
const querystirng=require('querystring');

http.createServer((req,resquest) =>{
   let url=querystirng.parse(req.url)['/?url'];
    http.get(url,res=>{
      let html='';
      res.on('data',chunk=>{
        html+=chunk;
      });
      res.on('end',()=>{
        resquest.writeHead(200,{
          "Access-Control-Allow-Origin":"*",
          "Access-Control-Allow-Headers":"X-Requested-With",
          "Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS",
          "X-Powered-By":' 3.2.1',
          "Content-Type":"application/json;charset=utf-8"
        });
        resquest.write(html);
        resquest.end();
      });
    });
}).listen(3000);

