const router = require("express").Router()
var macaddress = require('macaddress');

router.get("/", (req, res) => {

    macaddress.one(function (err, mac) {
        if (err) return reject(err)
        if (mac) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(mac);
        } 
      });
    // address.ip();  
    // address.ipv6(); 
    // address.mac(function (err, addr) {
    //     if (err) return reject(err)
    //     if (addr) {
    //         res.writeHead(200, { 'Content-Type': 'text/plain' });
    //         res.end(addr);
    //     }
    // });
    
    // address.ip('lo'); 
    
    // address.mac('vboxnet', function (err, addr) {
    //     if (err) return reject(err)
    //     if (addr) {
    //         res.writeHead(200, { 'Content-Type': 'text/plain' });
    //         res.end(addr);
    //     }
    // });
})

module.exports = router





