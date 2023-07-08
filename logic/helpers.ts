export async function getFromHtml(file: File) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(
    (await file?.text()) ?? "<></div>",
    "text/html"
  );

  // Get the table from the document
  const table = doc.querySelector('[role="main"]')?.children;

  let arr = [];
  if (table) {
    for (let child of table) {
      arr.push(
        child?.firstChild?.firstChild?.firstChild?.firstChild?.firstChild
          ?.textContent
      );
    }
  }

  return arr;
}

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
