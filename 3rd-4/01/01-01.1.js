const validateSelector = selector => {
  if (typeof selector !== "string" || !selector) throw "invalid selector";
};

const Table = (_ => {
  const Private = Symbol();
  return class {
    constructor(parent) {
      validateSelector(parent);
      this[Private] = { parent };
    }
    // load(url) {
    //   fetch(url)
    //     .then(response => response.json())
    //     .then(json => this.render());
    // }
    async load(url) {
      const response = await fetch(url),
        json = await response.json();
      console.log(json);
      this.render();
    }
    render() {
      // 부모 데이터 체크
      // table생성
      // title을 caption으로
      // header를 thead로
      // items 를 tr로
      // 부모에 table삽입
    }
  };
})();

const table = new Table("#data");

const loader = new loader("http://localhost:3000/table");
loader.load(json => {
  const render = new Render();
  render.setData(json);
  render.render();
});

// 값을 검증하지 않으면 위험
// value => Object !!! === type

// fetch(" http://localhost:3000/table")
//   .then(response => response.json())
//   .then(json => {
//     console.log(json);
//   });
table.load("http://localhost:3000/table");

const Data = class {
  async getData() {
    const json = await this._getData();
    return new Info(json);
  }
  async _getData() {
    throw "_getData must overrided";
  }
};

const JsonData = class extends Data {};
