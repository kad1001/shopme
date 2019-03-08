var inquirer = require('inquirer');
var mysql = require('mysql');

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

function runSearch() {

    // ask if the user would like to buy an item
    inquirer.prompt([{
                name: "id",
                type: "input",
                message: "Enter the ID for a product you would like to buy:",
                filter: Number
            },
            {
                name: "amount",
                type: "input",
                message: "How many of this to add to your cart?",
                filter: Number
            }
        ])
        .then(function (input) {

            var item = input.id;
            // update mysql
            var quantity = input.amount;

            var query = 'SELECT * FROM products WHERE ?';
            connection.query(query, {
                id: item
            }, function (err, data) {
                if (err) throw err;

                var thisData = data[0];

                // make sure there are enough of this in stock
                if (quantity <= thisData.stock) {
                    console.log("Added to cart!");

                    // subtract this amount from mysql stock
                    var updated = 'UPDATE products SET stock = ' + (thisData.stock - quantity) + ' WHERE id = ' + item;

                    connection.query(updated, function (err, res) {
                        if (err) throw err;

                        // tell the price of the selected item
                        console.log("Your total is $" + thisData.price * quantity);


                    })
                }

                // if there is not enough in stock

                else {
                    console.log("Sorry, there is not enough of this product in stock. Try again with a lower number.");
                }

            })
        })
}