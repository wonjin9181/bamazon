var mysql = require("mysql");
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "qpemfh91",
    database: "bamazon_DB"
});

connectDB();







function connectDB() {
    connection.connect(async function (err) {
        if (err) throw err;
        console.log("connected as id" + connection.threadId + "\n");
        loopNode()
    })
};

function loopNode(){
    readProducts()
    .then(askWhatToBuy)
    .then(checkProductsQuantity)
    .then(updateProducts)
    .then(function () {
        purchase()       
    })
}



function readProducts() {
    return new Promise((resolve, reject) => {
        console.log("Listing all products...\n");
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) reject(err);
            for (i = 0; i < res.length; i++) {
                console.log(
                    res[i].id + " | Name: "
                    + res[i].product_name + " | Department: "
                    + res[i].department_name + " | Price: $"
                    + res[i].price +"\n"
                );
            }
            resolve();
        })
    })
}



function checkProductsQuantity(x) {
    return new Promise((resolve, reject) => {
        console.log("Checking all products quantity...\n");
        connection.query("SELECT * FROM products WHERE id=?", x.id, function (err, res) {
            if (err) reject(err);
            console.log("You've picked " + parseInt(x.quantity) + " of id: " + x.id)

            if (res[0].stock_quantity > parseInt(x.quantity)) {
                var total = res[0].price * parseInt(x.quantity);
                console.log("\nLucky You! We have it in stock. You have purchased your item!\n");
                console.log("Your total is " + total + " dollars.")
                var newQuantity = res[0].stock_quantity - parseInt(x.quantity);
                resolve({ id: x.id, newQuantity })
            } else {
                console.log("insufficient quantity!");
                purchase()
            }
        })
    })
}

function purchase(){

    inquirer.prompt([
        {
            type: "confirm",
            name: "confirm",
            message:"Would you like another purchase?"
        }
    ]).then(function(res){
        if(res.confirm){
            loopNode()
        }
        else{
            connection.end()
        }
    })
}


function askWhatToBuy() {
    return inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "What is the id of the item you would like to purchase?"
        },
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to purchase?"
        }
    ]);
}


function updateProducts(data) {
    return new Promise((resolve, reject) => {
        console.log("\nUpdating product...")

        connection.query(`UPDATE products SET stock_quantity = ${data.newQuantity} WHERE id = ${data.id}`, function (err, res) {
            if (err) reject();
            console.log("products updated!\n")
            // console.log(res.affectedRows)
            resolve()
        })
    })
}