'use strict';
function printReceipt(inputs) {
  inputs = getInputs(inputs);
  let cartItems = bulidCartItems(inputs);
  console.log(bulidReceiptText(cartItems));
}

function getInputs(inputs) {
  let result = []
  inputs.forEach((element,index)=> {
    let array = []
    if(!result.find(item=>item===element)) {
      if(element.length=10) {
        result.push({barcode: element, count: 1})
      }else {
        array = element.split('-')
        result.push({barcode:array[0],count:array[1]})
      }
    }
    else{
      if(element.length=10) result[result.indexOf(element).count++]
      else result[result.indexOf(element).count+=array[1]]
    }
  })
  return result
  // let allItems = loadAllItems()
  // return Array.from({length:inputs.length},(v,i)=> {
  //   return allItems.find(element=>element.barcode===inputs[i])
  // })
}

function bulidCartItems(inputs) {
  let receiptItems = [];

  inputs.forEach(element => {
    if (!receiptItems.find(item => item.name === element.name)) {
      let count = inputs.filter(item => item.name === element.name).length
      receiptItems.push({name: element.name, count: count + element.unit, price: element.price, sum: count * element.price})
    }
  })

  return receiptItems;
}

function bulidReceiptText(array) {
  let receiptText = '***<没钱赚商店>收据***\n'
  let total = 0
  array.forEach(element => {
    total +=element.sum
    receiptText += `名称：${element.name}，数量：${element.count}，单价：${element.price.toFixed(2)}(元)，小计：${element.sum.toFixed(2)}(元)\n`
  })
  receiptText += `----------------------\n总计：${total.toFixed(2)}(元)\n**********************`
  return receiptText;
}
