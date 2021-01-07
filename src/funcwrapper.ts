import * as ts from "typescript";

export function wrapTestFunction(
  name: string,
  body: ts.Statement[]
): ts.Statement {
  const functionName = ts.createIdentifier("test");
  const caseName = ts.createStringLiteral(name);
  const asyncKw = ts.createModifier(ts.SyntaxKind.AsyncKeyword);
  const blockExpr = ts.createBlock(body);

  const testBody = ts.createArrowFunction(
    [asyncKw],
    undefined,
    undefined,
    undefined,
    undefined,
    blockExpr
  );

  const testCaseAST = ts.createCall(functionName, undefined, [
    caseName,
    testBody
  ]);

  return ts.createExpressionStatement(testCaseAST);
}
