window.sjs_specialreporters = [
  Block(BlockType.BUTTON, "specialreportersCategory", "Special Reporters"),
  Block(BlockType.REPORTER, "getCurrentDateTime", "current [format]", {
    format: ArgumentWithMenu("string", "datetime", "dateFormatMenu"),
  }, ({ format }) => {
    const date = new Date();
    switch (format) {
      case "datetime":
        return date.toLocaleString();
      case "date":
        return date.toLocaleDateString();
      case "time":
        return date.toLocaleTimeString();
      default:
        return date.toLocaleString();
    }
  }),
  Block(BlockType.REPORTER, "currentProjectID", "project ID", {}, () => {
    return window.scratchProjectId || "Unknown";
  }),
];
