// generates random id;
// of course it's better to use uuid library, but decided this way is good enough for pet project
const generateRandomId = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  // return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

export default generateRandomId;
