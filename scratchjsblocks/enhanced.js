window.sjs_enhanced = [
  Block(BlockType.BUTTON, "enhancedCategory", "Miscellaneous"),
  Block(BlockType.REPORTER, "httpRequest", "HTTP [method] to [url] with [data]", {
    method: ArgumentWithMenu("string", "GET", "httpMethodMenu"),
    url: Argument("string", "https://example.com"),
    data: Argument("string", '{"key":"value"}'),
  }, ({ method, url, data }) => {
    return fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: data
    }).then((res) => res.text());
  }),
];
