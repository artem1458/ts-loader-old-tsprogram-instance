import ts from 'typescript';
import path from "path";

const uniqFileContents = new Set<string>();
const types = new Set<string>();

const indexPath = path.join(__dirname, 'index.ts');

export default (program: ts.Program): ts.TransformerFactory<ts.SourceFile> => {
    return context => sourceFile => {
        //Skipping all files except our index.ts file with MyClass declaration
        if (sourceFile.fileName !== indexPath) {
            return sourceFile;
        }

        const typeChecker = program.getTypeChecker();

        const sourceFileFromProgram = program.getSourceFiles()
            .find(it => it.fileName === indexPath)!;
        uniqFileContents.add(sourceFileFromProgram!.getText());

        const classDeclaration = sourceFileFromProgram.statements.find(ts.isClassDeclaration);
        const classConstructor = classDeclaration!.members.find(ts.isConstructorDeclaration);
        const firstParameter = classConstructor!.parameters[0];

        const resolvedType = typeChecker.getTypeAtLocation(firstParameter);
        types.add(typeChecker.typeToString(resolvedType));

        console.log('uniqFileContents', uniqFileContents.size);
        console.log('types', Array.from(types));

        return sourceFile;
    };
};
