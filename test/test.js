// require('should');
// const axios = require('axios');

// // functions for managers lol
// // const bammang = require('../bamazonManager');
// const cheerio = require('cheerio');
// // Use this to make test calls into your app:
// const App = require('../bamazonManager');

// describe('Ping/Test', () => {

//   it('should test credentials', (done) => {

//     appTester(App.authentication.test, bundle)
//       .then(results => {
//         //should(results.status).eql(200);
//         console.log(results);
//         done();
//       })
//       .catch(done);
//   });

// });

// function getData() {
// 	console.log('whats up we made it');
// axios.get('https://zapier.com/app/developer').then(response => {
// 	console.log('here');
// 	// Load the web page source code into a cheerio instance
// 	const $ = cheerio.load(response.data);

// 	// this is the class of a table
// 	const urlElems = $('table.css-uuov7i');
// 	// We now loop through all the elements found
// 	for (let i = 0; i < urlElems.length; i++) {
// 		// Since the URL is within the span element, we can use the find method
// 		// To get all span elements with the `s1` class that are contained inside the
// 		// pre element. We select the first such element we find (since we have seen that the first span
// 		// element contains the URL)
// 		// css-l535sm

// 		// .td with that class name
// 		const urlSpan = $(urlElems[i]).find('css-l535sm')[0];

// 		// We proceed, only if the element exists
// 		if (urlSpan) {
// 			// We wrap the span in `$` to create another cheerio instance of only the span
// 			// and use the `text` method to get only the text (ignoring the HTML)
// 			// of the span element
// 			const urlText = $(urlSpan).text();

// 			// We then print the text on to the console
// 			console.log(urlText);
// 		}
// 	}
// });
// }

// describe('get zaps', () => {
	// axios.get('https://zapier.com/app/developer').then(response => {
	// 	console.log('here');
	// 	console.log(response.data);
	// 	// Load the web page source code into a cheerio instance
	// 	const $ = cheerio.load(response.data);

	// 	console.log($);
	// 	// this is the class of a table
	// 	const urlElems = $('table.css-uuov7i');
	// 	// We now loop through all the elements found
	// 	for (let i = 0; i < urlElems.length; i++) {
	// 		// Since the URL is within the span element, we can use the find method
	// 		// To get all span elements with the `s1` class that are contained inside the
	// 		// pre element. We select the first such element we find (since we have seen that the first span
	// 		// element contains the URL)
	// 		// css-l535sm

	// 		// .td with that class name
	// 		const urlSpan = $(urlElems[i]).find('css-l535sm')[0];

	// 		// We proceed, only if the element exists
	// 		if (urlSpan) {
	// 			// We wrap the span in `$` to create another cheerio instance of only the span
	// 			// and use the `text` method to get only the text (ignoring the HTML)
	// 			// of the span element
	// 			const urlText = $(urlSpan).text();

	// 			// We then print the text on to the console
	// 			console.log(urlText);
	// 		}
	// 	}
	// });
// });
// it('should get info from axios', done => {
// bammang
// getData()
// 		.then(results => {
// 			//should(results.status).eql(200);
// 			console.log(results);
// 			done();
// 		})
// 		.catch(done);
// });
// });
// });

// describe('List Customers', () => {

//   it('should list customers', (done) => {

//     appTester(App.triggers.customer.operation.performList, bundle)
//       .then(results => {
//         //should(results.status).eql(200);
//         console.log(results);
//         done();
//       })
//       .catch(done);
//   });

// });

// describe('List Orders', () => {

//   it('should list orders', (done) => {

//     appTester(App.triggers.order.operation.performList, bundle)
//       .then(results => {
//         //should(results.status).eql(200);
//         console.log(results);
//         done();
//       })
//       .catch(done);
//   });

// });