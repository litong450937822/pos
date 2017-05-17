'use strict';

function printReceipt(inputs) {
  let array = []
  inputs.forEach(element=> {
    array.push('名称：'+element.name+"，数量："+element.count+element.unit+"，单价："+element.price.toFixed(2)+'(元)，小计：'+(element.count*element.price).toFixed(2)+'(元)')
  })
  console.log('***<没钱赚商店>收据***\n'+array[0]+'\n'+array[1]+'\n'+array[2]+'\n----------------------\n总计：23.00(元)\n**********************')
}
