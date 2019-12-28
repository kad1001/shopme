// var mysql = require('mysql');
// var inquirer = require('inquirer');
// var Table = require('cli-table');

// var connection = mysql.createConnection({
// 	host: 'localhost',
// 	port: 8889,
// 	user: 'root',
// 	password: null,
// 	database: 'lefthook',
// });
// // table name: integrations

// const Table = require('cli-table');
// const axios = require('axios');

// const developerUrl = 'https://zapier.com/app/developer/';

// // main menu loads upon starting node
// connection.connect(function(err) {
// 	if (err) throw err;
// 	runSearch();
// });

// // main menu
// async function runSearch() {
// 	const answer = await inquirer.prompt({
// 		name: 'action',
// 		type: 'list',
// 		message: 'Select an option:',
// 		choices: [
// 			'Search Integrations',
// 			'View All Integrations',
// 			// "'Last Chance' Products",
// 			// 'Add to Inventory',
// 			// 'Add New Product',
// 			'Exit',
// 		],
// 	});

// 	switch (answer.action) {
// 		case 'Search Integrations':
// 			integrationSearch();
// 			break;

// 		case 'View All Integrations':
// 			selectIntegrations();
// 			break;

// 		// case "'Last Chance' Products":
// 		// 	lowSearch();
// 		// 	break;

// 		// case 'Add to Inventory':
// 		// 	addInventory();
// 		// 	break;

// 		// case 'Add New Product':
// 		// 	newProduct();
// 		// 	break;

// 		case 'exit':
// 			console.log('See ya later!');
// 			connection.end();
// 			process.exit();
// 			break;
// 	}
// }

// function showTable(c) {
// 	let table = new Table({
// 		head: ['ID', 'Key', 'Title', 'Developer Page'],
// 	});

// 	c.forEach(i => {
// 		// append id to link
// 		let url = (developerUrl += i.id);
// 		table.push([i.id, i.key, i.title, url]);
// 	});
// 	console.log(table.toString());
// }

// // displays all integrations in table
// function selectInte() {
// 	var query = 'SELECT * FROM integrations;';
// 	connection.query(query, function(err, res) {
// 		if (err) throw err;
// 		showTable(res);
// 		// runSearch();
// 	});
// }

// // Allows user to search for an integration
// async function integrationSearch() {
// 	let answer = await inquirer.prompt({
// 		name: 'integration_title',
// 		type: 'input',
// 		message: "Enter the title of an app you're working on",
// 	});

// 	// searches
// 	const query = 'SELECT * FROM integrations WHERE ?';
// 	connection.query(
// 		query,
// 		{
// 			// result from inquirer is sent to query sql
// 			integration_title: answer.title,
// 		},
// 		function(err, res) {
// 			if (err) throw err;

// 			// console.log(res)
// 			console.log("Here's what I found:");
// 			showTable(res);
// 		}
// 	);
// }

// // // finds the lowest inventory items
// // function lowSearch() {
// // 	var query = 'SELECT * FROM products WHERE stock < 5';
// // 	connection.query(query, function(err, res) {
// // 		showTable(res);
// // 		// runSearch();
// // 	});
// // }

// // // update stock quantity via item id
// // function addInventory() {
// // 	inquirer
// // 		.prompt([
// // 			{
// // 				name: 'id',
// // 				type: 'input',
// // 				message: 'Enter the ID of an item to add more of:',
// // 				filter: Number,
// // 			},
// // 			{
// // 				name: 'quantity',
// // 				type: 'input',
// // 				message: 'How many to add?',
// // 				filter: Number,
// // 			},
// // 		])
// // 		.then(function(input) {
// // 			var selected = input.id;
// // 			var quan = input.quantity;

// // 			var query = 'SELECT * FROM products WHERE ?';
// // 			connection.query(
// // 				query,
// // 				{
// // 					id: selected,
// // 				},
// // 				function(err, data) {
// // 					if (err) throw err;

// // 					var thisData = data[0];

// // 					var updated = 'UPDATE products SET stock = ' + (thisData.stock + quan) + ' WHERE id = ' + selected;

// // 					connection.query(updated, function(err, res) {
// // 						if (err) throw err;

// // 						console.log(
// // 							'Successfully updated stock for item with ID ' +
// // 								selected +
// // 								'. Current stock: ' +
// // 								(thisData.stock + quan)
// // 						);
// // 					});
// // 				}
// // 			);
// // 		});
// // }

// // // allows manager to add a completely new product to the store
// // function newProduct() {
// // 	inquirer
// // 		.prompt([
// // 			{
// // 				name: 'product_name',
// // 				type: 'input',
// // 				message: 'Tell me what the new product is called: ',
// // 			},
// // 			{
// // 				name: 'dept_name',
// // 				type: 'input',
// // 				message: 'What department is it in?',
// // 			},
// // 			{
// // 				name: 'price',
// // 				type: 'input',
// // 				message: 'Price (e.g. 40.25):',
// // 			},
// // 			{
// // 				name: 'stock',
// // 				type: 'input',
// // 				message: 'Quantity:',
// // 				filter: Number,
// // 			},
// // 		])
// // 		.then(function(input) {
// // 			var name = input.product_name;
// // 			var dept = input.dept_name;
// // 			var price = input.price;
// // 			var stock = input.stock;

// // 			// mysql update
// // 			var query = 'INSERT INTO products SET ?';

// // 			connection.query(query, input, function(err, res) {
// // 				if (err) throw err;

// // 				console.log('Success!');
// // 				console.log('Added ' + stock + ' ' + name + '(s) to the ' + dept + ' department at $' + price + '.');
// // 			});
// // 		});
// // }
