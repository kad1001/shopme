var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

const chalk = require('chalk');

// const err = chalk.bold.red;
const success = chalk.bold.green('Success!!');


var connection = mysql.createConnection({
	host: '127.0.0.1',
	port: 3306,
	user: 'root',
	password: 'password',
	database: 'integration_schema',
});
// table name: integrations

// const axios = require('axios');

// main menu loads upon starting node
connection.connect(function(err) {
	if (err) throw err;
	runSearch();
});

// main menu
async function runSearch() {
	let answer = await inquirer.prompt({
		name: 'action',
		type: 'list',
		message: 'Select an option:',
		choices: [
			'Search Integrations',
			'View All Integrations',
			// "'Last Chance' Products",
			// 'Add an Integration',
			'Add an Integration',
			'Exit',
		],
	});

	switch (answer.action) {
		case 'Search Integrations':
			integrationSearch();
			break;

		case 'View All Integrations':
			selectIntegrations();
			break;

		// case "'Last Chance' Products":
		// 	lowSearch();
		// 	break;

		// case 'Add to Inventory':
		// 	addInventory();
		// 	break;

		case 'Add an Integration':
			newIntegration();
			break;

		case 'Exit':
			console.log('See ya later!');
			connection.end();
			process.exit();

		// break;
		default:
			console.log('Whoops, you got lost..');
			process.exit();
	}
}

function showTable(c) {
	let table = new Table({
		head: ['Title', 'ID', 'Key', 'Developer Page'],
	});

	c.forEach(i => {
		table.push([i.title, i.id, i.key, `https://zapier.com/app/developer/app/${i.id}`]);
	});

	console.log(table.toString());

	// keep options at bottom
	runSearch();
}

// displays all integrations in table
function selectIntegrations() {
	var query = 'SELECT * FROM integrations;';
	connection.query(query, function(err, res) {
		if (err) throw err;
		showTable(res);
		// runSearch();
	});
}

// Allows user to search for an integration
async function integrationSearch() {
	let answer = await inquirer.prompt({
		name: 'title',
		type: 'input',
		message: "Enter the title of an app you're working on",
	});

	// searches
	let query = 'SELECT * FROM integrations WHERE ?';
	connection.query(
		query,
		{
			// result from inquirer is sent to query sql
			title: answer.title,
		},
		function(err, res) {
			if (err) throw err;

			// console.log(res)
			console.log("Here's what I found:");
			showTable(res);
		}
	);
}

// // finds the lowest inventory items
// function lowSearch() {
// 	var query = 'SELECT * FROM products WHERE stock < 5';
// 	connection.query(query, function(err, res) {
// 		showTable(res);
// 		// runSearch();
// 	});
// }

// // update stock quantity via item id
// function addInventory() {
// 	inquirer
// 		.prompt([
// 			{
// 				name: 'id',
// 				type: 'input',
// 				message: 'Enter the ID of an item to add more of:',
// 				filter: Number,
// 			},
// 			{
// 				name: 'quantity',
// 				type: 'input',
// 				message: 'How many to add?',
// 				filter: Number,
// 			},
// 		])
// 		.then(function(input) {
// 			var selected = input.id;
// 			var quan = input.quantity;

// 			var query = 'SELECT * FROM products WHERE ?';
// 			connection.query(
// 				query,
// 				{
// 					id: selected,
// 				},
// 				function(err, data) {
// 					if (err) throw err;

// 					var thisData = data[0];

// 					var updated = 'UPDATE products SET stock = ' + (thisData.stock + quan) + ' WHERE id = ' + selected;

// 					connection.query(updated, function(err, res) {
// 						if (err) throw err;

// 						console.log(
// 							'Successfully updated stock for item with ID ' +
// 								selected +
// 								'. Current stock: ' +
// 								(thisData.stock + quan)
// 						);
// 					});
// 				}
// 			);
// 		});
// }

// user can add a zapier app info
async function newIntegration() {
	let input = await inquirer.prompt([
		{
			name: 'id',
			type: 'input',
			message: 'Zapier App ID: ',
		},
		{
			name: 'key',
			type: 'input',
			message: 'Zapier App Key: ',
		},
		{
			name: 'title',
			type: 'input',
			message: 'Zapier App Title: ',
		},
	]);

	// var id = input.product_name;
	// var dept = input.dept_name;
	// var price = input.price;
	// var stock = input.stock;

	// input.map(s => s.name);
	// mysql update
	var query = 'INSERT INTO integrations SET ?';

	connection.query(query, input, function(err, res) {
		if (err) throw err;

		console.log(success);
		// console.log('Added ' + stock + ' ' + name + '(s) to the ' + dept + ' department at $' + price + '.');
	});
}
