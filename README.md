### ts-loader-old-tsprogram-instance

[Link to the issue](https://github.com/TypeStrong/ts-loader/issues/1615)

This repo is a minimal reproduction of a bug in ts-loader.

#### This project includes package.json with 2 script commands:

- **start:ts-loader-pure** Runs webpack dev server without **ttypescript** compiler
- **start:ts-loader-ttypescript** Runs webpack dev server with **ttypescript** compiler

### Steps to Reproduce the Problem
1. Create transformer that requires access to the ts.Program and/or ts.TypeChecker
2. Use ts-loader without any custom compilers (like **ttypescript**)
3. Run webpack project in watch mode
4. Make change in any project file. As an example - change type of class constructor property from **string** to **number**
5. Call **ts.Program.getSourceFiles()** and find file in which change was made, or acquire **ts.TypeChecker** from the **ts.Program**, and try to use it to receive type of class constructor property
6. Using **ts.Program.getSourceFiles()** check that file content is not changed (identical to initial content of the file)
7. Using  **ts.TypeChecker** check that type of class constructor property is not changed
