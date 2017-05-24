'use strict';
function printReceipt(inputs) {
  let objectInputs = calculateCount(inputs);
  objectInputs = calculatePromotions(objectInputs);
  let receiptItems = buildCartItems(objectInputs);
  console.log(bulidReceiptText(receiptItems));
}

function calculateCount(inputs) {
  let objectInputs = []
  inputs.forEach(element => {
    if (element.length === 10) {
      if (!objectInputs.find(item => item.barcode === element))
        objectInputs.push({barcode: element, count: 1})
      else objectInputs[objectInputs.findIndex(item=>item.barcode===element)].count++
    }
    else {
      let array = element.split('-')
      if (!objectInputs.find(item => item.barcode === array[0]))
        objectInputs.push({barcode: array[0], count: parseFloat(array[1])})
      else objectInputs[objectInputs.findIndex(item=>item.barcode===array[0])].count += parseFloat(array[1])
    }
  })

  return objectInputs
}
function calculatePromotions(inputs) {
  let promotionsItems = loadPromotions()[0].barcodes;
  inputs.forEach(elemtne=>{
    if(promotionsItems.some(item=>item===elemtne.barcode))
      elemtne.discount=Math.floor(elemtne.count/3)
    else elemtne.discount=0
  })
  return inputs
}
function buildCartItems(inputs) {
  let receiptItems = []
  let allItems = loadAllItems()

  inputs.forEach(element=> {
    let index = allItems.findIndex(item=>item.barcode===element.barcode)
    receiptItems.push({name:allItems[index].name,
      count:element.count+allItems[index].unit,
      price:allItems[index].price,
      discount:element.discount,
      sum:(parseFloat(element.count)-parseInt(element.discount))*allItems[index].price})
  })

  return receiptItems;
}

function bulidReceiptText(array) {
  let receiptText = '***<没钱赚商店>收据***\n'
  let total = 0
  let save = 0
  array.forEach(element => {
    total += element.sum
    save +=parseFloat(element.discount)*element.price;
    receiptText += `名称：${element.name}，数量：${element.count}，单价：${element.price.toFixed(2)}(元)，小计：${element.sum.toFixed(2)}(元)\n`
  })
  receiptText += `----------------------\n总计：${total.toFixed(2)}(元)\n节省：${save.toFixed(2)}(元)\n**********************`
  return receiptText;
}
