module.exports = function(arr, key) {
    let len = arr.length, min = Infinity, max = -Infinity;
    while (len--) {
        let checkValue = Number(arr[len][key]);
        if ( checkValue < min) { min = checkValue }
            if (checkValue > max) { max = checkValue }
        }
    if (max == min) return `${max}`
    else return `от ${min} до ${max}`
}