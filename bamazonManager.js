var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

// main menu loads upon starting node
connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

// main menu
function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do, boss?",
            choices: [
                "Search Inventory",
                "View All Products",
                "'Last Chance' Products",
                "Add to Inventory",
                "Add New Product",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Search Inventory":
                    productSearch();
                    break;

                case "View All Products":
                    selectProducts();
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
                    console.log("See ya later, boss.");
                    connection.end();
                    process.exit()
                    break;
            }
        });
}


function showTable(c) {
    var table = new Table({
        head: ['ID', 'Product Name', 'Department', 'Price', 'Quantity']
    })
    c.forEach(i => {
        table.push([
            i.id,
            i.product_name,
            i.dept_name,
            i.price,
            i.stock
        ])

    });
    console.log(table.toString());
}

// displays all products in table
function selectProducts() {
    var query = "SELECT * FROM products;"
    connection.query(query, function (err, res) {
        if (err) throw err;
        showTable(res);
        // runSearch();
    });
}

// Allows user to search for a product
function productSearch() {
    inquirer
        .prompt({
            name: "product",
            type: "input",
            message: "What is the name of the product you're looking for?"
        })
        .then(function (answer) {

            // searches 
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, {

                // result from inquirer is sent to query sql
                product_name: answer.product
            }, function (err, res) {
                if (err) throw err;

                // console.log(res)
                console.log("Here's what I found:");
                showTable(res);

            });
        });
}

// finds the lowest inventory items
function lowSearch() {
    var query = "SELECT * FROM products WHERE stock < 5";
    connection.query(query, function (err, res) {

        showTable(res);
        // runSearch();
    });
}

// update stock quantity via item id 
function addInventory() {
    inquirer.prompt([{
                name: "id",
                type: "input",
                message: "Enter the ID of an item to add more of:",
                filter: Number
            },
            {
                name: "quantity",
                type: "input",
                message: "How many to add?",
                filter: Number
            }
        ])
        .then(function (input) {
            var selected = input.id;
            var quan = input.quantity;

            var query = 'SELECT * FROM products WHERE ?';
            connection.query(query, {
                id: selected
            }, function (err, data) {
                if (err) throw err;

                var thisData = data[0];

                var updated = 'UPDATE products SET stock = ' + (thisData.stock + quan) + ' WHERE id = ' + selected;

                connection.query(updated, function (err, res) {
                    if (err) throw err;

                    console.log("Successfully updated stock for item with ID " + selected + ". Current stock: " + (thisData.stock + quan));

                })

            })
        })
}

// allows manager to add a completely new product to the store
function newProduct() {
    inquirer.prompt([{
                name: "product_name",
                type: "input",
                message: "Tell me what the new product is called: "
            },
            {
                name: "dept_name",
                type: "input",
                message: "What department is it in?"
            },
            {
                name: "price",
                type: "input",
                message: "Price (e.g. 40.25):"
            },
            {
                name: "stock",
                type: "input",
                message: "Quantity:",
                filter: Number
            }
        ])
        .then(function (input) {
            var name = input.product_name;
            var dept = input.dept_name;
            var price = input.price;
            var stock = input.stock;

            // mysql update
            var query = 'INSERT INTO products SET ?';

            connection.query(query, input, function (err, res) {
                if (err) throw err;

                console.log("Success!");
                console.log("Added " + stock + " " + name + "(s) to the " + dept + " department at $" + price + ".");

            })
        })
}