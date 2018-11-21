const Table = (_ => {
  const Private = Symbol();
  return class {
    constructor(parent) {}
    async load(url) {}
    render() {}
  };
})();

const PRLanguage_URL = `http://localhost:3000/table`;

const table = new Table("#data");
table.load(PRLanguage_URL);

const Table = (_ => {
  const Private = Symbol();
  return class {
    constructor(selector) {}
    async load(url) {}
    render() {}
  };
})();
