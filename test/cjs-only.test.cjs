const pkg = require("../dist/cjs/index.js");
test("CJS import works", () => {
  // Replace 'XHDWalletAPI' with a real export from your package
  expect(typeof pkg.XHDWalletAPI).toBe("function");
});
