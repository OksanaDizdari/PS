    
var http = require("http");

var post_data = JSON.stringify(

    {
        "collapse_key": "AIzaSyBAqGEstVaY64zmAhnWfWW8dHi0Jmg3-yo",
        "data": {
            "score": "4x8",
            "time": "15:16.2342",
            "age" : 29
        },
        "registration_ids": ["APA91bEt5LLV5VcV9E3q8zCuILp3z6p8E-mxNhwA4Wgs3UAvqCsAmvD-CaB18r6QO3Pms1QeAvWluyrrv6d0gEk5MjSj_S5RCsuERblQUHeGSfrbwjF0zzjU2UzjLL81FRyHgBbgZNRM8yhKw_qdIUz1uqhg7ph7bw"]
    }

);

var options = {
    hostname: "android.googleapis.com",
    port: 80,
    path: "/gcm/send",
    method: "POST",
    headers: {
        "content-type": "application/json",
        "content-length": post_data.length,
        "authorization": "key=AIzaSyBAqGEstVaY64zmAhnWfWW8dHi0Jmg3-yo"
    }
};

var req = http.request(options, function(res) {

    console.log("STATUS: " + res.statusCode);
    console.log("HEADERS: " + JSON.stringify(res.headers));

    res.setEncoding("utf8");

    res.on("data", function(chunk) {

        console.log("BODY: " + chunk);

    });

});

req.on("error", function(e) {

    console.log("problem with request: " + e.message);
    console.log(e.stack);

});

// write data to request body
req.write(post_data);

req.end();
