import {formatCurrency} from '../scripts/utlis/money.js'

console.log('test suite: formatCurrency')

console.log('converts cents into dollars');

if(formatCurrency(2095) === 20.95){
    console.log("test passes")
} else{
    console.log("Test failed")
}

console.log('works with zero')
if(formatCurrency(0)  === 0.00){
    console.log('passed')
}
else{
    console.log('failed')
}

console.log('rounds up to the nearest cents')
if(formatCurrency(2000.5) === 20.01){
    console.log('passed');
}
else{
    console.log('failed')
}