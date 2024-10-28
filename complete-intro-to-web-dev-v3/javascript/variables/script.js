/*
Letcode Easy problem:
2635. Apply Transform Over Each Element in Array

Given an integer array arr and a mapping function fn,
return a new array with a transformation applied to each element.

problem link:
https://leetcode.com/problems/apply-transform-over-each-element-in-array/
*/

/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var map = function(arr, fn)
{
    var returnedArray = [];
    for (let i = 0; i < arr.length; i++)
        returnedArray[i] = fn(arr[i], i);
    return returnedArray; 
};
