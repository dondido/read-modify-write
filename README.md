# read-modify-write
NodeJS - Read File, Modify Content, Write to File

## read-modify-write module content

1. Introduction to read-modify-write
2. Read File/Directory
3. Write to File/Directory
4. Modify Content

### Introduction to read-modify-write

This Node module provides an API to interact with the file system and perform recursive sequential IO operations (such as file reading/writing and file content modification). It executes all operations in a blocking and synchronous way. 
To use the library all we need is to import read-modify-write module into our code.
```js
const rmw = require('read-modify-write');
```

### Read File/Directory

To read file content recursively in a chosen directory we simply need to pass the folder path as the first parameter to the already imported module:
```js
rmw('src/dummy');
```

### Write to File/Directory

To copy files from one directory to another we need a path modifier function which is passed as a second parameter:
```js
const move = filePath => filePath.replace('src', 'dist');
rmw('src/dummy', move);
```
The path modifier function takes one parameter which is the location / path for each of the listed files. The code above copies all files in the 'src/dummy' folder to the 'dist/dummy'.

To filter files with certain extension we need to supply a function that will be called on each files on the list, and only return the values that pass a specific test (in this case the file extension is present in the string):
```js
const move = filePath => filePath.replace('src', 'dist');
const filterHtml = c => c.endsWith('.html');
rmw('src/dummy', move, filterHtml);
```
