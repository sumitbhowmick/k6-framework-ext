import {selectRandomItems} from './commonUtil.js';

export function getProductNames(productCount){
    let productList = (globalThis.productList).json("products.#.title")
    //Logger.info(`${productList.length} productList:${productList}`)

    let randomProductList = selectRandomItems(productList,productCount)
    return randomProductList
}
