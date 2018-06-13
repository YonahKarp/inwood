$(document).ready(function(){
    $("#close").click(function(){
        $("#ykarp").hide();
    })
 });

 var geocoder, map, infowindow, service;

 function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: {lat: 40.619579, lng: -73.748738}
    });
    geocoder = new google.maps.Geocoder();
    infowindow = new google.maps.InfoWindow();

    // document.getElementById('submit').addEventListener('click', function() {
    //     geocodeAddress(geocoder, map);
    // });

    addAddresses(baseAddresses)

    // getAddresses().then(function(addresses){
    //     var arr = JSON.parse(addresses)

    //     var newAddresses = arr.map(e => e.address).filter(e => baseAddresses.indexOf(e) == -1);
    
    //addAddresses(newAddresses)
       // addSpecialAddresses();
    //});
    // addSpecialAddresses();

    setTimeout(function(){ $("#title").fadeIn()},1000)

    setTimeout(function(){ $("#title").fadeOut()},4000)
  
}

function addAddresses(addresses){

    for(var i= 0; i < addresses.length; i++){
        placeMarkerAtAddress(addresses[i]);
    }
}

function addSpecialAddresses(){
    var addresses = ["321 Doughty Blvd", ]

    placeMarkerAtAddress(addresses[0] + "", "./synagogue.png");
    
}

window.markers = [];

function placeMarkerAtAddress(address, icon){
    var marker;
    marker = new google.maps.Marker({
        map: map,
        position: address.position,
        icon: icon
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div><strong>' + address.address + '</strong></div>');
        infowindow.open(map, this);
        });
}

function geocodeAddress() {
    var address = document.getElementById('address').value;
    placeMarkerAtAddress(address)
}

function getAddresses(){

    return new Promise(function(resolve, reject) {
      
        $.get("https://inwood-addresses.herokuapp.com/?method=get", function(data){
            console.log(data)
            resolve(data);
        }).fail(function(){
            console.log("failed get");
            resolve([]);
        })
    });
   
}

var baseAddresses = [
    {position:{lng:-73.75056669999998,lat:40.6225408},address:"188 Donahue Avenue"},
    {position:{lng:-73.745878,lat:40.61571929999999},address:"226 Elizabeth Street"},
    {position:{lng:-73.7508469,lat:40.627474},address:"78 Meadow Road"},
    {position:{lng:-73.74909579999996,lat:40.615835},address:"316 Morris Avenue"},
    {position:{lng:-73.7486821,lat:40.6150795},address:"305 Morris Avenue"},
    {position:{lng:-73.75001509999998,lat:40.6227319},address:"97 Healy Avenue"},
    {position:{lng:-73.75383039999997,lat:40.61767649999999},address:"229 Elm Road"},
    {position:{lng:-73.74523440000002,lat:40.6176754},address:"156 Jefferson Street"},
    {position:{lng:-73.74799250000001,lat:40.6166425},address:"286 Wanser Avenue"},
    {position:{lng:-73.74854419999997,lat:40.6217856},address:"425 Sheridan Blvd."},
    {position:{lng:-73.75125630000002,lat:40.6273169},address:"75 Meadow Road"},
    {position:{lng:-73.74583200000001,lat:40.6196942},address:"10 Rinehart Place"},
    {position:{lng:-73.7484407,lat:40.6200024},address:"29 Wescott Street"},
    {position:{lng:-73.74394689999997,lat:40.6163039},address:"171 Wanser Avenue"},
    {position:{lng:-73.7456482,lat:40.6167299},address:"220 Wanser Avenue"},
    {position:{lng:-73.7488659,lat:40.6192035},address:"322 Mott Avenue"},
    {position:{lng:-73.74927969999999,lat:40.621621},address:"35 Robert Road"},
    {position:{lng:-73.74799250000001,lat:40.6155987},address:"280 Morris Avenue"},
    {position:{lng:-73.74468279999996,lat:40.6167068},address:"194 Wanser Avenue"},
    {position:{lng:-73.75065870000003,lat:40.62715350000001},address:"68 Meadow Road"},
    {position:{lng:-73.74987720000001,lat:40.6208181},address:"128 Donahue Avenue"},
    {position:{lng:-73.74551029999998,lat:40.6151638},address:"107 Lord Avenue"},
    {position:{lng:-73.74946349999999,lat:40.6240826},address:"62 Soloff Blvd."},
    {position:{lng:-73.74872800000003,lat:40.61377179999999},address:"315 Bayview Avenue"},
    {position:{lng:-73.74849819999997,lat:40.6145119},address:"21 Mervin Street"},
    {position:{lng:-73.74940609999999,lat:40.6249343},address:"8 Brafmans Road"},
    {position:{lng:-73.74560220000001,lat:40.6194678},address:"3 Rhinehart Place"},
    {position:{lng:-73.7482569,lat:40.6250393},address:"25 Soloff Blvd."},
    {position:{lng:-73.7484063,lat:40.61991039999999},address:"25 Westcott Street"},
    {position:{lng:-73.74353359999998,lat:40.6158841},address:"162 Redwood Avenue"},
    {position:{lng:-73.74523049999999,lat:40.6196245},address:"62 Roosevelt Avenue"},
    {position:{lng:-73.75010709999998,lat:40.6222813},address:"5 Fairway Drive"},
    {position:{lng:-73.75116430000003,lat:40.62676250000001},address:"59 Meadow Road"},
    {position:{lng:-73.74633770000003,lat:40.6173318},address:"208 Doughty Blvd."},
    {position:{lng:-73.75456589999999,lat:40.6167387},address:"64 Maple Road"},
    {position:{lng:-73.74922219999996,lat:40.6210233},address:"389 Sheridan Blvd."},
    {position:{lng:-73.74960140000002,lat:40.625262},address:"19 Cheshire Road"},
    {position:{lng:-73.7488659,lat:40.6227983},address:"56 Dickson Street"},
    {position:{lng:-73.75540620000004,lat:40.6171652},address:"175 Davis Avenue"},
    {position:{lng:-73.75116430000003,lat:40.6168287},address:"126 Solomon Avenue"},
    {position:{lng:-73.74780870000001,lat:40.6155722},address:"278 Morris Avenue"},
    {position:{lng:-73.74334970000001,lat:40.6218103},address:"18 Beekman Street"},
    {position:{lng:-73.7442461,lat:40.6163153},address:"181 Wanser Avenue"},
    {position:{lng:-73.75006109999998,lat:40.6238981},address:"80 Soloff Blvd."},
    {position:{lng:-73.75406029999999,lat:40.618676},address:"265 Elm Road"},
    {position:{lng:-73.74514249999999,lat:40.6188604},address:"218 Mott Avenue"},
    {position:{lng:-73.74975080000002,lat:40.6219884},address:"40 Robert Road"},
    {position:{lng:-73.74960140000002,lat:40.6257258},address:"2 Meadow Road"},
    {position:{lng:-73.74279810000002,lat:40.61245359999999},address:"102 Cumberland Place"},
    {position:{lng:-73.75242839999999,lat:40.6167982},address:"50 Cedar Road"},
    {position:{lng:-73.74471729999999,lat:40.6173206},address:"141 Jefferson Street"},
    {position:{lng:-73.75029089999998,lat:40.622617},address:"105 Healy Avenue"},
    {position:{lng:-73.7512678,lat:40.6235598},address:"108 Soloff Blvd."},
    {position:{lng:-73.74827979999998,lat:40.6248494},address:"29 Soloff Blvd."},
    {position:{lng:-73.74348759999998,lat:40.6166892},address:"162 Wanser Avenue"},
    {position:{lng:-73.755807,lat:40.6185023},address:"85 Chestnut Road"},
    {position:{lng:-73.75056669999998,lat:40.6241642},address:"312 Sprague Road"},
    {position:{lng:-73.74551029999998,lat:40.6153958},address:"217 Elizabeth Street"},
    {position:{lng:-73.7486821,lat:40.6192157},address:"318 Mott Avenue"},
    {position:{lng:-73.74528040000001,lat:40.6209289},address:"106 Roosevelt Avenue"},
    {position:{lng:-73.745924,lat:40.6163058},address:"227 Wanser Avenue"},
    {position:{lng:-73.75121030000003,lat:40.6248753},address:"332 Sprague Road"},
    {position:{lng:-73.7461998,lat:40.6201724},address:"316 Doughty Blvd."},
    {position:{lng:-73.74693530000002,lat:40.6174952},address:"215 Doughty Blvd."},
    {position:{lng:-73.74321179999998,lat:40.6214425},address:"10 Beekman Street"},
    {position:{lng:-73.7491877,lat:40.6199457},address:"6 Spaulding Lane"},
    {position:{lng:-73.75222159999998,lat:40.6175608},address:"88 Davis Avenue"},
    {position:{lng:-73.74877400000003,lat:40.6248336},address:"1 Brafmans Road"},
    {position:{lng:-73.74799250000001,lat:40.6203147},address:"42 Wescott Street"},
    {position:{lng:-73.7508426,lat:40.6233149},address:"105 Soloff Blvd."},
    {position:{lng:-73.74788910000001,lat:40.6194204},address:"10 Westcott Street"},
    {position:{lng:-73.74532640000001,lat:40.6206263},address:"96 Roosevelt Avenue"},
    {position:{lng:-73.75038289999998,lat:40.62382849999999},address:"90 Soloff Blvd."},
    {position:{lng:-73.75672630000003,lat:40.6180162},address:"136 Bayswater Blvd."},
    {position:{lng:-73.75010709999998,lat:40.6222813},address:"5 Fairway Drive"},
    {position:{lng:-73.7485097,lat:40.6195291},address:"19 Spaulding Lane"},
    {position:{lng:-73.7486821,lat:40.6257866},address:"5 Soloff Blvd."},
    {position:{lng:-73.745878,lat:40.6216335},address:"38 Douglas Street"},
    {position:{lng:-73.75065870000003,lat:40.6258781},address:"23 Meadow Road"},
    {position:{lng:-73.7488659,lat:40.6252333},address:"14 Soloff Blvd."},
    {position:{lng:-73.74314290000001,lat:40.616311},address:"151 Wanser Avenue"},
    {position:{lng:-73.74601589999997,lat:40.6194114},address:"17 Rhinehart Place"},
    {position:{lng:-73.74845219999997,lat:40.6255216},address:"13 Soloff Blvd."},
    {position:{lng:-73.755156,lat:40.6166077},address:"12 Chestnut Road"},
    {position:{lng:-73.7540143,lat:40.6166979},address:"193 Elm Road"},
    {position:{lng:-73.75006109999998,lat:40.6215017},address:"148 Donahue Avenue"},
    {position:{lng:-73.75512200000003,lat:40.616692},address:"78 Maple Road"},
    {position:{lng:-73.74757879999999,lat:40.6155778},address:"274 Morris Avenue"},
    {position:{lng:-73.7480845,lat:40.6227244},address:"57 Jaclyn Court"},
    {position:{lng:-73.745878,lat:40.6153714},address:"227 Elizabeth Street"},
    {position:{lng:-73.74752139999998,lat:40.6191162},address:"290 Mott Avenue"},
    {position:{lng:-73.74854419999997,lat:40.6256508},address:"9 Soloff Blvd."},
    {position:{lng:-73.7456482,lat:40.6199769},address:"75 Roosevelt Avenue"},
    {position:{lng:-73.75176190000002,lat:40.6242204},address:"324 Finger Island Road"},
    {position:{lng:-73.74992320000001,lat:40.6209406},address:"132 Donahue Avenue"},
    {position:{lng:-73.74841779999997,lat:40.6219317},address:"3 Robert Road"},
    {position:{lng:-73.74790059999998,lat:40.6196443},address:"18 Westcott Street"},
    {position:{lng:-73.7565884,lat:40.618035},address:"132 Bayswater Blvd."},
    {position:{lng:-73.75065870000003,lat:40.6233657},address:"101 Soloff Blvd."},
    {position:{lng:-73.7504748,lat:40.626354},address:"38 Meadow Road"},
    {position:{lng:-73.75042880000001,lat:40.6261928},address:"32 Meadow Road"},
    {position:{lng:-73.75577249999998,lat:40.6187003},address:"91 Chestnut Rd."},
    {position:{lng:-73.74483220000002,lat:40.6176657},address:"146 Jefferson Street"},
    {position:{lng:-73.750245,lat:40.6256639},address:"11 Meadow Road"},
    {position:{lng:-73.74904979999997,lat:40.623134},address:"68 Dickson Street"},
    {position:{lng:-73.74523440000002,lat:40.62076769999999},address:"100 Roosevelt Avenue"}
]

    //CID 386004419497-5eal5fn9vfpdumjagrcrf6nr52g4rkth.apps.googleusercontent.com
