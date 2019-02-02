# Simple DB Hashmap-based Index
Made by Viktor Kim Christiansen
## Overview
Simple databse basically just using a hashmap in memory for lookup to a linenumber index in the database file, from a key.

Data is stored like `key|value` edit the function calls in app.js to try out the functions.

### Functions Available:
* start() - starts the DB from the saved file (initializes the hashmap)
* add(key, valye) (add a value to the DB)
* get(key) (prints a value from a key)
* remove(key) (removes a value from a key)
* printEntireFile() (prints out the entire DB file)
* printIndexMap() (prints out the in-memory hashmap)

## Try it out
### Run Locally
* Clone repo -> Install NodeJS -> run 
* node app.js

## Run With Docker
* Have docker and build the container
* docker build -t simpledb .
* docker run --rm simpledb
