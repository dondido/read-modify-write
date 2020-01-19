# read-modify-write
NodeJS - Read File, Modify Content, Write to File

## read-modify-write module content

1. Introduction to read-modify-write
2. Read File/Directory
3. Modify Content
4. Write to File/Directory

### Introduction to read-modify-write

This Node module provides an API to interact with the file system and perform recursive sequential IO operations (such as file reading/writing and file content modification).
To use the library all we need is to import read-modify-write module into our code.
```js
const rmw = require('read-modify-write');
```

### Read File/Directory
Reads the contents of a directory or a single file asynchronously and returns the results. 
Now we will discuss about how to read a new file using Node JS FS API.
