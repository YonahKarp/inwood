var http = require('http');
var fs = require('fs');
var url = require('url');
var sql = require('mysql');

http.createServer(function (request, res) {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");

    var params = url.parse(request.url, true).query;

    console.log("hit server: " + params.method);
    
    switch(params.method){
        case "test":
            test();
            break;
        case "query":
            query(params.query);
            break;
        case "add":
            addAddress(params.password, params.address, params.lat, params.lng);
            break;
        case "get":
            getAddresses();
            break; 
        case "getPending":
            getPending();
            break;  
        case "suggest":
            addToPending(params.address, params.lat, params.lng);
            break; 
        case "approve":
            approveAddress(params.password, params.address, params.lat, params.lng);
            break;
        case "delete":
            deleteAddress(params.password, params.address);
            break;   
        default:
            res.end();
            break;
    }

    //get
    function getAddresses(){
        console.log("getting addresses...")

        var queryStr = "SELECT * FROM addresses;";
        query(queryStr);
    }

    //get
    function getPending(){
        console.log("getting pending...")

        var queryStr = "SELECT * FROM pending;";
        query(queryStr);
    }

    //suggest
    function addToPending(address, lat, lng){
        var queryStr = "INSERT INTO pending VALUES('"+address+"',"+lng+","+lat+");"
        query(queryStr);
    }

    //add
    function addAddress(password, address, lat, lng){

        if(password == "pinitHeskiel"){

            var queryStr = "INSERT INTO addresses VALUES('"+address+"',"+lng+","+lat+");"
            query(queryStr, password);
        }else
            process.exitCode = 1;
    }

    //approve address
    function approveAddress(password, address, lat, lng){
        if(password == "pinitHeskiel"){
            var queryStr = "DELETE FROM pending WHERE address = '"+address+"'; INSERT INTO addresses VALUES('"+address+"',"+lng+","+lat+");"
            query(queryStr), password;
        }else
            fail("The password you submitted was incorrect");
    }

    //delete address
    function deleteAddress(password, address){
        if(password == "pinitHeskiel"){
            var queryStr = "DELETE FROM pending WHERE address = '"+address+"';"
            query(queryStr, password);
        }else
           fail("The password you submitted was incorrect")
    }

    function test(){

        console.log("testing changes")

        var con = sql.createConnection({
            host: "g3v9lgqa8h5nq05o.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
            user: "c8qmp9y0f2fpdclk",
            port     :  3306,
            acquireTimeout: 10000, //10 secs
            connectTimeout: 10000,
            password: "b4djyejzow6gpk21",
            database: "jpn7i5whtbwbqtrl"
        });
        
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
        });

        con.end();
        res.end();
    }

    function fail(message){
        process.exitCode = 1;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('{"status": "failed", "message": "'+message+'"}');
        res.end();
    }

    function query(queryStr, password){

        var con = sql.createConnection({
            host: "g3v9lgqa8h5nq05o.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
            user: "c8qmp9y0f2fpdclk",
            port     :  3306,
            acquireTimeout: 10000, //10 secs
            connectTimeout: 10000,
            password: "b4djyejzow6gpk21",
            database: "jpn7i5whtbwbqtrl",
            multipleStatements: true
        });
        
        con.connect(function(err) {
            if (err) throw err;
            var sql = queryStr;

            console.log("query = " + sql);
    
            con.query(sql, function (err, result) {
                if (err) throw err;

                if(password){
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write('{"password": "'+password+'"}');
                }else{
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(JSON.stringify(result));
                }
                console.log(JSON.stringify(result));


                con.end();
                res.end();
            });

        });
    }

}).listen(process.env.PORT || 5000);
