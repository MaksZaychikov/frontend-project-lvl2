import _ from 'lodash';
import readFile from './readFile.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const keys1 = _.keys(file1);
  const keys2 = _.keys(file2);
  const sortedKeys = _.union(keys1, keys2).sort();

  const newArr = [];
  sortedKeys.map((key) => {
    if (!_.has(file1, key)) {
      newArr.push(`  + ${key}: ${file2[key]}`);
    } else if (!_.has(file2, key)) {
      newArr.push(`  - ${key}: ${file1[key]}`);
    } else if (file1[key] !== file2[key]) {
      newArr.push(`  - ${key}: ${file1[key]}`);
      newArr.push(`  + ${key}: ${file2[key]}`);
    } else {
      newArr.push(`    ${key}: ${file1[key]}`);
    }

    return null;
  });

  return ['{', ...newArr, '}'].join('\n');
};

export default genDiff;