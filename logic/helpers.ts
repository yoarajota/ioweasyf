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

type keyable = {
  [key: string]: any;
};

type following = {
  relationships_following: Array<keyable>;
}

export async function getFromJson(file: File) {
  let data: Array<keyable> | following = await new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const fileContent: string | ArrayBuffer | null | undefined =
        event.target?.result;
      if (typeof fileContent === "string") {
        const data: Array<keyable> | following = JSON.parse(fileContent);
        resolve(data);
      }
    };

    reader.readAsText(file);
  });

  let arr: Array<string> = [];

  for (let value of (data as following)?.relationships_following ?? data) {
    arr.push(value?.string_list_data[0].value);
  }
 
  return arr;
}

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
