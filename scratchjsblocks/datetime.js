window.sjs_datetime = [
  Block(BlockType.BUTTON, "datetimeCategory", "Date & Time"),
  Block(BlockType.REPORTER, "addDays", "add [days] days to [date]", {
    days: Argument("number", 7),
    date: Argument("string", "2026-01-01"),
  }, ({ days, date }) => {
    try {
      const d = new Date(date);
      d.setDate(d.getDate() + parseInt(days));
      return d.toISOString().slice(0, 10);
    } catch (e) {
      return date;
    }
  }),
  
  Block(BlockType.REPORTER, "subtractDays", "subtract [days] days from [date]", {
    days: Argument("number", 7),
    date: Argument("string", "2026-01-01"),
  }, ({ days, date }) => {
    try {
      const d = new Date(date);
      d.setDate(d.getDate() - parseInt(days));
      return d.toISOString().slice(0, 10);
    } catch (e) {
      return date;
    }
  }),
  
  Block(BlockType.REPORTER, "getDayOfWeek", "day of week for [date]", {
    date: Argument("string", "2026-01-01"),
  }, ({ date }) => {
    try {
      const d = new Date(date);
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return days[d.getDay()];
    } catch (e) {
      return "";
    }
  }),
  
  Block(BlockType.REPORTER, "getMonthName", "month name for [date]", {
    date: Argument("string", "2026-01-01"),
  }, ({ date }) => {
    try {
      const d = new Date(date);
      const months = ["January", "February", "March", "April", "May", "June", 
                     "July", "August", "September", "October", "November", "December"];
      return months[d.getMonth()];
    } catch (e) {
      return "";
    }
  }),
  
  Block(BlockType.BOOLEAN, "isLeapYear", "is [year] a leap year?", {
    year: Argument("number", 2024),
  }, ({ year }) => {
    const y = parseInt(year);
    return (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
  }),
  
  Block(BlockType.REPORTER, "formatDuration", "format [seconds] seconds as HH:MM:SS", {
    seconds: Argument("number", 3661),
  }, ({ seconds }) => {
    const totalSeconds = parseInt(seconds);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }),
  
  Block(BlockType.REPORTER, "countdown", "days until [targetDate]", {
    targetDate: Argument("string", "2026-12-25"),
  }, ({ targetDate }) => {
    try {
      const target = new Date(targetDate);
      const today = new Date();
      const diffTime = target - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays.toString();
    } catch (e) {
      return "0";
    }
  }),
  
  Block(BlockType.REPORTER, "getAgeInDays", "age in days from [birthdate]", {
    birthdate: Argument("string", "2000-01-01"),
  }, ({ birthdate }) => {
    try {
      const birth = new Date(birthdate);
      const today = new Date();
      const diffTime = today - birth;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      return diffDays.toString();
    } catch (e) {
      return "0";
    }
  }),
  
  Block(BlockType.REPORTER, "getWeekNumber", "week number for [date]", {
    date: Argument("string", "2026-01-01"),
  }, ({ date }) => {
    try {
      const d = new Date(date);
      const firstDayOfYear = new Date(d.getFullYear(), 0, 1);
      const pastDaysOfYear = (d - firstDayOfYear) / 86400000;
      return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7).toString();
    } catch (e) {
      return "1";
    }
  }),
  
  Block(BlockType.REPORTER, "getQuarter", "quarter for [date]", {
    date: Argument("string", "2026-01-01"),
  }, ({ date }) => {
    try {
      const d = new Date(date);
      return Math.ceil((d.getMonth() + 1) / 3).toString();
    } catch (e) {
      return "1";
    }
  }),
  
  Block(BlockType.BOOLEAN, "isWeekend", "is [date] a weekend?", {
    date: Argument("string", "2026-01-01"),
  }, ({ date }) => {
    try {
      const d = new Date(date);
      const day = d.getDay();
      return day === 0 || day === 6; // Sunday or Saturday
    } catch (e) {
      return false;
    }
  }),
  
  Block(BlockType.REPORTER, "getDaysInMonth", "days in month for [date]", {
    date: Argument("string", "2026-01-01"),
  }, ({ date }) => {
    try {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      return new Date(year, month, 0).getDate().toString();
    } catch (e) {
      return "30";
    }
  }),
  
  Block(BlockType.REPORTER, "formatDate", "format [date] as [format]", {
    date: Argument("string", "2026-01-01"),
    format: ArgumentWithMenu("string", "MM/DD/YYYY", "dateFormatMenu"),
  }, ({ date, format }) => {
    try {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const day = d.getDate().toString().padStart(2, '0');
      
      switch (format) {
        case "MM/DD/YYYY":
          return `${month}/${day}/${year}`;
        case "DD/MM/YYYY":
          return `${day}/${month}/${year}`;
        case "YYYY-MM-DD":
          return `${year}-${month}-${day}`;
        case "Month DD, YYYY":
          const months = ["January", "February", "March", "April", "May", "June", 
                         "July", "August", "September", "October", "November", "December"];
          return `${months[d.getMonth()]} ${day}, ${year}`;
        default:
          return `${month}/${day}/${year}`;
      }
    } catch (e) {
      return date;
    }
  }),
  
  Block(BlockType.REPORTER, "getTimeAgo", "time ago from [timestamp]", {
    timestamp: Argument("number", 1761995200000),
  }, ({ timestamp }) => {
    try {
      const past = new Date(parseInt(timestamp));
      const now = new Date();
      const diffMs = now - past;
      const diffSeconds = Math.floor(diffMs / 1000);
      const diffMinutes = Math.floor(diffSeconds / 60);
      const diffHours = Math.floor(diffMinutes / 60);
      const diffDays = Math.floor(diffHours / 24);
      
      if (diffDays > 0) return `${diffDays} days ago`;
      if (diffHours > 0) return `${diffHours} hours ago`;
      if (diffMinutes > 0) return `${diffMinutes} minutes ago`;
      return `${diffSeconds} seconds ago`;
    } catch (e) {
      return "Unknown";
    }
  }),
];
