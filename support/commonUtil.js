

export function arrayRange(start, stop, step=1){
    return Array.from(
        { length: (stop - start) / step + 1 },
        (value, index) => start + index * step
    );
}
    
//Use: indexArray = arrayRange(0, 199, 1)


export function selectRandomItems(arr, n) {
  // Shuffle array
  const shuffled = arr.sort(() => 0.5 - Math.random());
  //Original array preserved
  //const shuffled = [...array].sort(() => 0.5 - Math.random());

  // Get sub-array of first n elements after shuffled
  let selected = shuffled.slice(0, n);
  return selected
}
//Use: selectedPortraitTokenIndices = selectRandomItems(indexArray, sleeveTokenCount)


//Generate array of given length (itemCount) where each element has maximum value (maxItemValue) and sum of all item value is constant (allItemSum)
// If sum of all items should be equal or less than given value (allItemSum), parameter (exactFlag) should be false. 
//True means exact, false means less than or equal to
export function generateRandomConstrainedArray(itemCount,maxItemValue,allItemSum,exactFlag=true) {
    const arr = [];
    //const itemCount = 4
    //const maxItemValue = 3
    let remainingSum = allItemSum
    //const exactFlag = true
  
    for (let i = 0; i < itemCount; i++) {
      let maxRangeforPosition = (maxItemValue<remainingSum) ? maxItemValue : remainingSum
      const randomNumber = Math.floor(Math.random() * (maxRangeforPosition + 1));
      
      if (i<itemCount-1){
        arr.push(randomNumber);
        remainingSum -= randomNumber;
      } else {
        if (exactFlag) arr.push(remainingSum);//Option for exact 4
        else arr.push(randomNumber);
      }
      
    }  
    //arr.push(remainingSum);//Option for exact 4
    return arr;
  }
  
//Get a value randomly based on probability/weight
export function getRandomNameBiased(namesObj) {
  let totalProb = 0;
  for (let name in namesObj) {
    totalProb += namesObj[name];
  }
  
  let randNum = Math.random() * totalProb;
  let probSum = 0;
  for (let name in namesObj) {
    probSum += namesObj[name];
    if (randNum <= probSum) {
      return name;
    }
  }
}

/*Safely verifies if a child object exists or not, without throwing exception, useful for multi-level objects. returns "undefined" if the child or its parents
  doesn't exist. Example:
  const test = { level1:{ level2:{ level3:'level3'} } };
  console.log(getNested(test, 'level1', 'level2', 'level3')); // 'level3'
  console.log(getNested(test, 'level1', 'level2', 'level3', 'length')); // 6
  console.log(getNested(test, 'level1', 'level2', 'foo')); // undefined
  console.log(getNested(test, 'a', 'b')); // undefined
*/

export function getNested(obj, ...args) {
  return args.reduce((obj, level) => obj && obj[level], obj)
}

export function arrayDifference(arr1, arr2) {
  const missingInArr1 = arr2.filter(item => !arr1.includes(item));
  const missingInArr2 = arr1.filter(item => !arr2.includes(item));
  return [...missingInArr1, ...missingInArr2];
}

export function getKeyByValue(object, value) {
  return Object.keys(object).find(key =>
      object[key] === value);
}


export function queryObjectToArray(queryObject){

  let searchArray = []
  for(const key in queryObject){
    let queryItem = queryObject[key]
    let queryItemStr = (typeof queryItem === 'object' && queryItem !== null) ? JSON.stringify(queryItem) : queryItem
    //Logger.debug(queryItemStr)
    if (Array.isArray(queryItem) && key.toLowerCase()!="filters"){
      if (queryItem.length>0){
        queryItem.forEach(queryLineItem => {
          //let queryLineItemStr = (typeof queryLineItem === 'object' && queryLineItem !== null) ? JSON.stringify(queryLineItem) : queryLineItem
          searchArray.push([key, queryLineItem])
        });
      }    
    } else{
      if(queryItemStr!=""){
        searchArray.push([key,queryItemStr])
      }      
    } 
  }

  //Logger.info(`searchArray:`,searchArray)

  let searchParams = new URLSearchParams(searchArray)
  return searchParams
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}