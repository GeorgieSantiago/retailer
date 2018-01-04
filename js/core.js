// Initialize app
var myApp = new Framework7({
    cacheDuration: 0
    //uniqueHistory: true
});

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    console.log(page);
});

window.addEventListener('error', function (e) {
    console.log(e);
}, true);

var Router = {
    RouteFactory: function (page) {
        myApp.initPage(page);
        console.log(page);
    }
};

var API = {
    base_url: "https://pipeline-api.000webhostapp.com/www/pipeline/index.php",
    get: function (url , body) {
        //do get request
        $$.get(url, body, function (data) {
            console.log('Request Sent: ');
            console.log(body);
            API.dataFactory(data);
        });
    },

    post: function (url , body) {
        //do post request
        $$.post(url, body, function (data) {
            console.log('Request Sent: ');
            console.log(body);
            API.dataFactory(data);
        });
    },

    request: function()
    {
        //get JSON request
        $$.getJSON(url, function (json) {
            console.log(json);
        });
    },

    dataFactory: function(data)
    {
        console.log(data);
        USER.push(data);
    },
    /*TODO Special Controller request type User*/
    /*TODO pass all user credentials and create login/registration system :D maybe even
    * sync some Apps: Facebook, Google, ya know the works!*/
    init: function()
    {
        this.post(API.base_url , {
            'auth' : '12345',
            'request_type' : 'User',
            'table' : 'test'
        })
    }

}



//Post AppInit Calls

// Data Constant for moving app data internally
const USER = [];

// Initialize the data call
API.init();