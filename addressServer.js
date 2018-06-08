var http = require('http');
var fs = require('fs');
var url = require('url');
var globalResponse;

http.createServer(function (request, res) {

    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    globalResponse = res

    var params = url.parse(request.url, true).query;
    

    switch(params.method){
        case "setup":
            initialSetup();
            break;
        case "add":
            if(params.address)
                addAddress(params.address);
            break;
        case "get":
            getAddresses();
            break;  
        default:
            break;
    }
}).listen(process.env.PORT || 5000);

//initialList
function initialSetup(){
    var initialList = [
        {"address" :"322 Mott Ave"},
        {"address" : "37 Oak Ave"},
        {"address" : "377 Sheridan blvd"},
        {"address" : "222 Doughty blvd"},
        {"address" : "10 Brafmans Rd"}
    ];

    fs.writeFile('addresses.txt', JSON.stringify(initialList), function (err) {
        if (err) throw err;
        console.log('wrote List!');
    });

    fs.readFile('addresses.txt', function(err, data) {
        globalResponse.writeHead(200, {'Content-Type': 'text/html'});
        globalResponse.write(data);
        globalResponse.end();
    });
}

//add
function addAddress(address){
    var addresses;

    console.log('adding address..');


    addresses = JSON.parse(fs.readFileSync('addresses.txt', 'utf8'));

    console.log('addresses:' + JSON.stringify(addresses));

    if(!addresses)
        return;
    else
        addresses.push({"address": address})

    fs.writeFile('addresses.txt', JSON.stringify(addresses), function (err) {
        if (err) throw err;
        console.log('wrote addresses');
    });

    globalResponse.end();
}


//get
function getAddresses(){
    console.log("getting addresses...")

    fs.readFile('addresses.txt', function(err, data) {
        globalResponse.writeHead(200, {'Content-Type': 'text/html'});
        globalResponse.write(JSON.stringify(data));
        globalResponse.end();
    });
}