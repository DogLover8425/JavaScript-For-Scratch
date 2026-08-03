window.sjs_statistics = [
  Block(BlockType.BUTTON, "statisticsCategory", "Statistics"),
  Block(BlockType.REPORTER, "calculateMean", "mean of [numbers]", {
    numbers: Argument("string", '[1, 2, 3, 4, 5]'),
  }, ({ numbers }) => {
    try {
      const nums = JSON.parse(numbers);
      if (!Array.isArray(nums) || nums.length === 0) return "0";
      
      const sum = nums.reduce((acc, num) => acc + parseFloat(num), 0);
      return (sum / nums.length).toString();
    } catch (e) {
      return "0";
    }
  }),
  
  Block(BlockType.REPORTER, "calculateMedian", "median of [numbers]", {
    numbers: Argument("string", '[1, 2, 3, 4, 5]'),
  }, ({ numbers }) => {
    try {
      const nums = JSON.parse(numbers);
      if (!Array.isArray(nums) || nums.length === 0) return "0";
      
      const sorted = nums.map(num => parseFloat(num)).sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      
      if (sorted.length % 2 === 0) {
        return ((sorted[mid - 1] + sorted[mid]) / 2).toString();
      } else {
        return sorted[mid].toString();
      }
    } catch (e) {
      return "0";
    }
  }),
  
  Block(BlockType.REPORTER, "calculateMode", "mode of [numbers]", {
    numbers: Argument("string", '[1, 2, 2, 3, 3, 3]'),
  }, ({ numbers }) => {
    try {
      const nums = JSON.parse(numbers);
      if (!Array.isArray(nums) || nums.length === 0) return "";
      
      const frequency = {};
      nums.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
      });
      
      let maxFreq = 0;
      let mode = "";
      
      for (const [num, freq] of Object.entries(frequency)) {
        if (freq > maxFreq) {
          maxFreq = freq;
          mode = num;
        }
      }
      
      return mode;
    } catch (e) {
      return "";
    }
  }),
  
  Block(BlockType.REPORTER, "calculateRange", "range of [numbers]", {
    numbers: Argument("string", '[1, 2, 3, 4, 5]'),
  }, ({ numbers }) => {
    try {
      const nums = JSON.parse(numbers);
      if (!Array.isArray(nums) || nums.length === 0) return "0";
      
      const min = Math.min(...nums.map(num => parseFloat(num)));
      const max = Math.max(...nums.map(num => parseFloat(num)));
      return (max - min).toString();
    } catch (e) {
      return "0";
    }
  }),
  
  Block(BlockType.REPORTER, "calculateStandardDeviation", "standard deviation of [numbers]", {
    numbers: Argument("string", '[1, 2, 3, 4, 5]'),
  }, ({ numbers }) => {
    try {
      const nums = JSON.parse(numbers);
      if (!Array.isArray(nums) || nums.length === 0) return "0";
      
      const values = nums.map(num => parseFloat(num));
      const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
      const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
      const avgSquaredDiff = squaredDiffs.reduce((acc, val) => acc + val, 0) / values.length;
      
      return Math.sqrt(avgSquaredDiff).toString();
    } catch (e) {
      return "0";
    }
  }),
  
  Block(BlockType.REPORTER, "findPercentile", "percentile [percent] of [numbers]", {
    percent: Argument("number", 50),
    numbers: Argument("string", '[1, 2, 3, 4, 5]'),
  }, ({ percent, numbers }) => {
    try {
      const nums = JSON.parse(numbers);
      if (!Array.isArray(nums) || nums.length === 0) return "0";
      
      const sorted = nums.map(num => parseFloat(num)).sort((a, b) => a - b);
      const p = parseInt(percent) / 100;
      const index = p * (sorted.length - 1);
      
      if (index === Math.floor(index)) {
        return sorted[index].toString();
      } else {
        const lower = sorted[Math.floor(index)];
        const upper = sorted[Math.ceil(index)];
        const fraction = index - Math.floor(index);
        return (lower + fraction * (upper - lower)).toString();
      }
    } catch (e) {
      return "0";
    }
  }),
  
  Block(BlockType.REPORTER, "calculateVariance", "variance of [numbers]", {
    numbers: Argument("string", '[1, 2, 3, 4, 5]'),
  }, ({ numbers }) => {
    try {
      const nums = JSON.parse(numbers);
      if (!Array.isArray(nums) || nums.length === 0) return "0";
      
      const values = nums.map(num => parseFloat(num));
      const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
      const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
      const variance = squaredDiffs.reduce((acc, val) => acc + val, 0) / values.length;
      
      return variance.toString();
    } catch (e) {
      return "0";
    }
  }),
  
  Block(BlockType.REPORTER, "findMin", "minimum of [numbers]", {
    numbers: Argument("string", '[1, 2, 3, 4, 5]'),
  }, ({ numbers }) => {
    try {
      const nums = JSON.parse(numbers);
      if (!Array.isArray(nums) || nums.length === 0) return "0";
      
      return Math.min(...nums.map(num => parseFloat(num))).toString();
    } catch (e) {
      return "0";
    }
  }),
  
  Block(BlockType.REPORTER, "findMax", "maximum of [numbers]", {
    numbers: Argument("string", '[1, 2, 3, 4, 5]'),
  }, ({ numbers }) => {
    try {
      const nums = JSON.parse(numbers);
      if (!Array.isArray(nums) || nums.length === 0) return "0";
      
      return Math.max(...nums.map(num => parseFloat(num))).toString();
    } catch (e) {
      return "0";
    }
  }),
  
  Block(BlockType.REPORTER, "calculateSum", "sum of [numbers]", {
    numbers: Argument("string", '[1, 2, 3, 4, 5]'),
  }, ({ numbers }) => {
    try {
      const nums = JSON.parse(numbers);
      if (!Array.isArray(nums)) return "0";
      
      return nums.reduce((acc, num) => acc + parseFloat(num), 0).toString();
    } catch (e) {
      return "0";
    }
  }),
  
  Block(BlockType.REPORTER, "calculateProduct", "product of [numbers]", {
    numbers: Argument("string", '[1, 2, 3, 4, 5]'),
  }, ({ numbers }) => {
    try {
      const nums = JSON.parse(numbers);
      if (!Array.isArray(nums) || nums.length === 0) return "0";
      
      return nums.reduce((acc, num) => acc * parseFloat(num), 1).toString();
    } catch (e) {
      return "0";
    }
  }),
  
  Block(BlockType.REPORTER, "countOccurrences", "count occurrences of [value] in [array]", {
    value: Argument("string", "apple"),
    array: Argument("string", '["apple","banana","apple","orange"]'),
  }, ({ value, array }) => {
    try {
      const arr = JSON.parse(array);
      if (!Array.isArray(arr)) return "0";
      
      return arr.filter(item => item === value).length.toString();
    } catch (e) {
      return "0";
    }
  }),
  
  Block(BlockType.REPORTER, "getFrequency", "frequency of all values in [array]", {
    array: Argument("string", '["apple","banana","apple","orange"]'),
  }, ({ array }) => {
    try {
      const arr = JSON.parse(array);
      if (!Array.isArray(arr)) return "{}";
      
      const frequency = {};
      arr.forEach(item => {
        frequency[item] = (frequency[item] || 0) + 1;
      });
      
      return JSON.stringify(frequency);
    } catch (e) {
      return "{}";
    }
  }),
  
  Block(BlockType.BOOLEAN, "isOutlier", "is [value] an outlier in [array]?", {
    value: Argument("number", 100),
    array: Argument("string", '[1, 2, 3, 4, 5]'),
  }, ({ value, array }) => {
    try {
      const nums = JSON.parse(array);
      if (!Array.isArray(nums) || nums.length < 4) return false;
      
      const sorted = nums.map(num => parseFloat(num)).sort((a, b) => a - b);
      const q1Index = Math.floor(sorted.length * 0.25);
      const q3Index = Math.floor(sorted.length * 0.75);
      const q1 = sorted[q1Index];
      const q3 = sorted[q3Index];
      const iqr = q3 - q1;
      const lowerBound = q1 - 1.5 * iqr;
      const upperBound = q3 + 1.5 * iqr;
      
      const val = parseFloat(value);
      return val < lowerBound || val > upperBound;
    } catch (e) {
      return false;
    }
  }),
  
  Block(BlockType.REPORTER, "correlation", "correlation between [array1] and [array2]", {
    array1: Argument("string", '[1, 2, 3, 4, 5]'),
    array2: Argument("string", '[2, 4, 6, 8, 10]'),
  }, ({ array1, array2 }) => {
    try {
      const arr1 = JSON.parse(array1);
      const arr2 = JSON.parse(array2);
      
      if (!Array.isArray(arr1) || !Array.isArray(arr2) || arr1.length !== arr2.length) {
        return "0";
      }
      
      const n = arr1.length;
      const sum1 = arr1.reduce((acc, val) => acc + parseFloat(val), 0);
      const sum2 = arr2.reduce((acc, val) => acc + parseFloat(val), 0);
      const sum1Sq = arr1.reduce((acc, val) => acc + Math.pow(parseFloat(val), 2), 0);
      const sum2Sq = arr2.reduce((acc, val) => acc + Math.pow(parseFloat(val), 2), 0);
      const sum12 = arr1.reduce((acc, val, i) => acc + parseFloat(val) * parseFloat(arr2[i]), 0);
      
      const numerator = n * sum12 - sum1 * sum2;
      const denominator = Math.sqrt((n * sum1Sq - sum1 * sum1) * (n * sum2Sq - sum2 * sum2));
      
      return denominator === 0 ? "0" : (numerator / denominator).toString();
    } catch (e) {
      return "0";
    }
  }),
];
