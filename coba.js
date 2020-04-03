const obj =  {
    '5' : 0,
}

delete obj['5']

console.log(obj);

const k = Object.keys(obj)
console.log('k: ', k);