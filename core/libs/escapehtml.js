function escapeHtml(unsafe) {
  return (''+unsafe)
      .replace(/&(?!amp;)/g, "&amp;")
      .replace(/<(?!lt;)/g, "&lt;")
      .replace(/>(?!gt;)/g, "&gt;")
      .replace(/"(?!quot;)/g, "&quot;")
      .replace(/'(?!#039;)/g, "&#039;");
};