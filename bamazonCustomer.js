var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Products",
                "Search Products for Sale",
                "'Last Chance' Products",
                "Add to Inventory",
                "Add New Product",
                "exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View All Products":
                    selectProducts();
                    break;

                case "Search Products for Sale":
                    productSearch();
                    break;

                case "'Last Chance' Products":
                    lowSearch();
                    break;

                case "Add to Inventory":
                    addInventory();
                    break;

                case "Add New Product":
                    newProduct();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
}

// displays all products in table
function selectProducts() {
    var query = "SELECT * FROM products;"
    connection.query(query, function (err, res) {
        console.log(res);
    })
}

// Allows user to search for a product
function productSearch() {
    inquirer
        .prompt({
            name: "product",
            type: "input",
            message: "What product would you like to search for?"
        })
        .then(function (answer) {
            var query = "SELECT product_name, dept_name, price FROM products WHERE ?";
            connection.query(query, {
                product_name: answer.product
            }, function (err, res) {
                for (var i = 0; i < res.length; i++) {
                    console.log("Name: " + res[i].product_name + " || Department: " + res[i].dept_name + " || Price: " + res[i].price);
                }
                runSearch();
            });
        });
}

// finds the lowest inventory items
