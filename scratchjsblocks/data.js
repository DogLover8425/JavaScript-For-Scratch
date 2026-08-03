window.sjs_data = [
  Block(BlockType.BUTTON, "dataCategory", "Data"),
  Block(BlockType.REPORTER, "parseCsv", "parse CSV [csv]", {
    csv: Argument("string", "Name,Age,City\nJohn,25,NYC\nJane,30,LA"),
  }, ({ csv }) => {
    try {
      const lines = csv.trim().split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      const data = [];
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        const row = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        data.push(row);
      }
      
      return JSON.stringify(data);
    } catch (e) {
      return "[]";
    }
  }),
  
  Block(BlockType.REPORTER, "arrayToCsv", "array [array] to CSV", {
    array: Argument("string", '[{"Name":"John","Age":25},{"Name":"Jane","Age":30}]'),
  }, ({ array }) => {
    try {
      const data = JSON.parse(array);
      if (!Array.isArray(data) || data.length === 0) return "";
      
      const headers = Object.keys(data[0]);
      const csvLines = [headers.join(',')];
      
      data.forEach(row => {
        const values = headers.map(header => {
          const value = row[header] || '';
          return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
        });
        csvLines.push(values.join(','));
      });
      
      return csvLines.join('\n');
    } catch (e) {
      return "";
    }
  }),
  
  Block(BlockType.REPORTER, "formatNumber", "format [number] to [decimals] decimals", {
    number: Argument("number", 3.141592),
    decimals: Argument("number", 2),
  }, ({ number, decimals }) => {
    return parseFloat(number).toFixed(parseInt(decimals));
  }),
  
  Block(BlockType.REPORTER, "generateUuid", "generate UUID", {}, () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }),
  
  Block(BlockType.REPORTER, "base64Encode", "Base64 encode [text]", {
    text: Argument("string", "Hello world!"),
  }, ({ text }) => {
    try {
      return btoa(unescape(encodeURIComponent(text)));
    } catch (e) {
      return "";
    }
  }),
  
  Block(BlockType.REPORTER, "base64Decode", "Base64 decode [text]", {
    text: Argument("string", "SGVsbG8gV29ybGQ="),
  }, ({ text }) => {
    try {
      return decodeURIComponent(escape(atob(text)));
    } catch (e) {
      return "";
    }
  }),
  
  Block(BlockType.REPORTER, "hashString", "hash [text] with [algorithm]", {
    text: Argument("string", "Hello world!"),
    algorithm: ArgumentWithMenu("string", "simple", "hashAlgorithmMenu"),
  }, ({ text, algorithm }) => {
    if (algorithm === "simple") {
      let hash = 0;
      for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash).toString(16);
    }
    return "";
  }),
  
  Block(BlockType.REPORTER, "parseXml", "parse XML [xml]", {
    xml: Argument("string", "<root><item>test</item></root>"),
  }, ({ xml }) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, "text/xml");
      return doc.documentElement.outerHTML;
    } catch (e) {
      return "";
    }
  }),
  
  Block(BlockType.REPORTER, "jsonToTable", "convert JSON [json] to table", {
    json: Argument("string", '[{"name":"John","age":25},{"name":"Jane","age":30}]'),
  }, ({ json }) => {
    try {
      const data = JSON.parse(json);
      if (!Array.isArray(data) || data.length === 0) return "";
      
      const headers = Object.keys(data[0]);
      let table = "<table border='1'>";
      
      table += "<tr>" + headers.map(h => `<th>${h}</th>`).join("") + "</tr>";
      
      data.forEach(row => {
        table += "<tr>" + headers.map(h => `<td>${row[h] || ''}</td>`).join("") + "</tr>";
      });
      
      table += "</table>";
      return table;
    } catch (e) {
      return "";
    }
  }),
  
  Block(BlockType.REPORTER, "compressString", "compress [text] (simple)", {
    text: Argument("string", "aaaaabbbbcc"),
  }, ({ text }) => {
    let compressed = "";
    let count = 1;
    
    for (let i = 0; i < text.length; i++) {
      if (text[i] === text[i + 1]) {
        count++;
      } else {
        compressed += text[i] + (count > 1 ? count : '');
        count = 1;
      }
    }
    
    return compressed;
  }),
  
  Block(BlockType.REPORTER, "decompressString", "decompress [text] (simple)", {
    text: Argument("string", "a4b4c2"),
  }, ({ text }) => {
    let decompressed = "";
    let i = 0;
    
    while (i < text.length) {
      const char = text[i];
      let count = "";
      
      while (i + 1 < text.length && !isNaN(text[i + 1])) {
        count += text[i + 1];
        i++;
      }
      
      const repeatCount = count ? parseInt(count) : 1;
      decompressed += char.repeat(repeatCount);
      i++;
    }
    
    return decompressed;
  }),
  
  Block(BlockType.BOOLEAN, "isValidEmail", "is [email] a valid email?", {
    email: Argument("string", "user@example.com"),
  }, ({ email }) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }),
  
  Block(BlockType.BOOLEAN, "isValidUrl", "is [url] a valid URL?", {
    url: Argument("string", "https://example.com"),
  }, ({ url }) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }),
  
  Block(BlockType.REPORTER, "extractUrls", "extract URLs from [text]", {
    text: Argument("string", "visit https://example.com and http://test.org"),
  }, ({ text }) => {
    const urlRegex = /[^:\s]+:\/\/[\S]+/g;
    const urls = text.match(urlRegex) || [];
    return JSON.stringify(urls);
  }),
  
  Block(BlockType.REPORTER, "extractEmails", "extract emails from [text]", {
    text: Argument("string", "Contact user@example.com or admin@test.org"),
  }, ({ text }) => {
    const emailRegex = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g;
    const emails = text.match(emailRegex) || [];
    return JSON.stringify(emails);
  }),
  
  Block(BlockType.REPORTER, "calculateAge", "calculate age from birthdate [birthdate]", {
    birthdate: Argument("string", "2000-01-01"),
  }, ({ birthdate }) => {
    try {
      const birth = new Date(birthdate);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      
      return age.toString();
    } catch (e) {
      return "0";
    }
  }),
  
  Block(BlockType.REPORTER, "daysBetween", "days between [date1] and [date2]", {
    date1: Argument("string", "2024-01-01"),
    date2: Argument("string", "2024-01-15"),
  }, ({ date1, date2 }) => {
    try {
      const d1 = new Date(date1);
      const d2 = new Date(date2);
      const diffTime = Math.abs(d2 - d1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays.toString();
    } catch (e) {
      return "0";
    }
  }),
  
  Block(BlockType.REPORTER, "formatFileSize", "format [bytes] as file size", {
    bytes: Argument("number", 1048576),
  }, ({ bytes }) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    if (bytes === 0) return '0 Bytes';
  
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }),

  Block(BlockType.REPORTER, "formatNumberWithSuffix", "format [number] with [decimals] decimals", {
    number: Argument("number", 1234.567),
    decimals: Argument("number", 2),
  }, ({ number, decimals }) => {
    const suffixes = ['', 'k', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'D', 'Ud'];
    let absNumber = Math.abs(number);
    let suffixIndex = 0;
    
    while (absNumber >= 1000 && suffixIndex < suffixes.length - 1) {
      absNumber /= 1000;
      suffixIndex++;
    }
    
    const formatted = (number / Math.pow(1000, suffixIndex)).toFixed(parseInt(decimals));
    return formatted + suffixes[suffixIndex];
  }),
  
  Block(BlockType.REPORTER, "generateRandomString", "generate random string length [length]", {
    length: Argument("number", 10),
  }, ({ length }) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < parseInt(length); i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }),
  
  Block(BlockType.BOOLEAN, "isJsonEmpty", "is JSON [json] empty?", {
    json: Argument("string", "{}"),
  }, ({ json }) => {
    try {
      const parsed = JSON.parse(json);
      if (Array.isArray(parsed)) return parsed.length === 0;
      if (typeof parsed === 'object') return Object.keys(parsed).length === 0;
      return false;
    } catch (e) {
      return true;
    }
  }),
];
