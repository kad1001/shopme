## ShopMe
A command line interface for an example store.

## Technologies Used
<ul>
<li>Javascript</li>
<li>Node.js</li>
<li>
<a href="https://www.npmjs.com/package/mysql">MySQL</a></li>
<li> <a href="https://www.npmjs.com/package/cli-table">CLI Table</a>
</li>
<li>
<a href="https://www.npmjs.com/package/inquirer/v/0.2.3">Inquirer.js</a>
</li>
</ul>


## Installation
Use the package manager [npm](https://www.npmjs.com/) to install npm package.

```bash
npm install
```

The dependencies are included in the package.json after this.


## Usage

To run bamazonManager.js:
```bash
node bamazonManager
```

You will be given a list of choices:
<br>
<img src="./assets/choose.png">

If you select "View All Products", the database of products is presented:
<br>
<img src="./assets/all.png">



To run bamazonCustomer.js:
```bash
node bamazonCustomer
```

You will be prompted to enter an ID for a product, and you can add it to your cart and update the stock of the product in the database.
<br>
<img src="./assets/customer.png">

For a complete rundown of features, you can watch the <a href="https://drive.google.com/file/d/1vtzz0sLvWJTWN_lcDupdETV2XmtVin3G/view?usp=sharing">demo</a>.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)