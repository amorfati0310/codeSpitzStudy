const validateSelector = selector => {
  if (typeof selector !== "string" || !selector) throw "invalid selector";
};

const Table = (_ => {
  return class {
    constructor(parent) {}
    async load(url) {}
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

const tableUrl = "http://localhost:3000/table";
const table = new Table("#data");

table.load(tableUrl);
