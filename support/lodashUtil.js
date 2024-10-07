import lodash from 'lodash';
import Logger from './loggerjreeves.js';

export function lodashTest(){
    let arr = [1, 2, 3, 4, 5, 6, "a", "b", "c", "d"];
    Logger.info("Before: ", arr)
    
    // Making chunks of size 3
    Logger.info("After: ", lodash.chunk(arr, 3))
}
