import { AUTH_API } from '../configurations'

export const convertToIncludesExcludes = (object, type) => {
  if (!object.hasOwnProperty(AUTH_API.INCLUDES) && !object.hasOwnProperty(AUTH_API.EXCLUDES)) {
    return { [AUTH_API.INCLUDES]: AUTH_API.ENUMS[type].map(value => value), [AUTH_API.EXCLUDES]: [] }
  } else if (object.hasOwnProperty(AUTH_API.INCLUDES) && !object.hasOwnProperty(AUTH_API.EXCLUDES)) {
    return {
      [AUTH_API.EXCLUDES]: AUTH_API.ENUMS[type].filter(type => !object[AUTH_API.INCLUDES].includes(type)),
      ...object
    }
  } else if (!object.hasOwnProperty(AUTH_API.INCLUDES) && object.hasOwnProperty(AUTH_API.EXCLUDES)) {
    return {
      [AUTH_API.INCLUDES]: AUTH_API.ENUMS[type].filter(type => !object[AUTH_API.EXCLUDES].includes(type)),
      ...object
    }
  } else {
    return object
  }
}

export const getNestedObject = (nestedObject, pathArray) =>
  pathArray.reduce((object, key) =>
    (object && object[key] !== 'undefined') ? object[key] : undefined, nestedObject
  )

export const moveIncludesExcludes = (includes, excludes, value, to) => {
  let returnIncludes
  let returExcludes

  if (to === AUTH_API.INCLUDES) {
    returExcludes = excludes.filter(excl => excl !== value)
    returnIncludes = includes.slice(0, includes.length)
    returnIncludes.push(value)
  } else {
    returnIncludes = includes.filter(inc => inc !== value)
    returExcludes = excludes.slice(0, excludes.length)
    returExcludes.push(value)
  }

  return { [AUTH_API.INCLUDES]: returnIncludes, [AUTH_API.EXCLUDES]: returExcludes }
}

export const sortArrayOfObjects = (array, by, direction = 'ascending') => {
  console.log(array, 'array i sort')
  return (array && array[1]) ? (by && by.length === 1 ? array.sort(compareObjects(by, direction)) :
  array.sort(compareObjectsByMultipleFields(by, direction))) : []
}

function compareObjects(by, direction) {
  return function innerSort(a, b) {
    let aObj = a
    let bObj = b
    let byArray = by[0].split('.')
    for (let idx = 0; idx < byArray.length; idx++) {
      aObj = aObj[byArray[idx]]
      bObj = bObj[byArray[idx]]
    }
    return direction === 'ascending' ? aObj.localeCompare(bObj) : bObj.localeCompare(aObj)
  }
}

function compareObjectsByMultipleFields(by, direction) {
  return function innerSort(a, b) {
    if (by.length === 0) return 0; // force to equal if keys run out
    let key = by[0]; // take out the first key
    if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1; // will be 1 if DESC
    else if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1; // will be -1 if DESC
    else return compareObjectsByMultipleFields(by.slice(1))(a, b);
  }
}