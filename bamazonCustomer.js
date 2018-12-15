// what we need to run the program, as well as starting our connection to the local server
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});
// Connects to our Database (bamazon)
connection.connect(function (err) {
    if (err) throw err;
    // function to start our program
    productsScreen();
});
// our initial program function
function productsScreen() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        console.log("Items to buy");
        for (var i = 0; i < res.length; i++) {
            console.log('Item ID: ' + res[i].id);
            console.log('Product Name: ' + res[i].product);
            console.log('Department: ' + res[i].department);
            console.log('Price: ' + res[i].price);
            console.log('Stock Quantity: ' + res[i].stock_quanity);
            console.log('------------------------------------------');
        }     
        initialize();
    });
}
// our function to buy
function initialize() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw console.log("connection error:" + err);
    inquirer.prompt([
                {
                    name: 'selectId',
                    type: 'input',
                    message: 'Enter the ID number for the Item you would like to buy:',
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
        },
                {
                    name: 'shoppingCart',
                    type: 'input',
                    message: 'How many would you like?',
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                } // selecting our products from the DB
            ]).then (function (answers) {
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, {
                id: answers.selectId
            }, function (err, res) {
                // getting the information on our items selected
                var quanity = res[0].stock_quanity;
                var item = answers.shoppingCart;
                // checking if there is enough stock of the item to proceed with our sale
                if (quanity >= item) {
                    var leftInStock = quanity - item;
                    var EurTotal = res[0].price * item;
                    var itemPurchased = res[0].product;
        
                    console.log('Total price: ' + EurTotal);
                    
                    connection.query(
                        "UPDATE products SET ? WHERE ?", [{
                                stock_quanity: leftInStock
                                },
                            {
                                id: answers.selectId
                        }],
                        function (error) {
                            if (error) throw err;
                            // printing our receipt
                            console.log("-\|/-\|/-   receipt   -\|/-\|/-");
                            console.log("");
                            console.log("Sold to You: " + itemPurchased);
                            console.log("# of items: " + item);
                            console.log("Money Well Spent $" + EurTotal);
                            console.log("ThAnkYouCoMeAgAin -----");
                            console.log("");
                            console.log("-\|/-\|/-   receipt   -\|/-\|/-");
                            console.log("(We are now closed- press control C to quit program)");
                        }
                    );
                } else {
                    console.log("Restock needed, please try again later, but for now, pick something else");
                    console.log("or fewer quantity")
                   productsScreen();
                }
            });
        });
        });
    }
