interface CyrillicToLatinMap {
  [key: string]: string;
}

const cyrillicToLatinMap: CyrillicToLatinMap = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "yo",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "kh",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
};

const codea: number = "a".charCodeAt(0);

export function translite(text: string): string {
  const result: string[] = [];

  for (let char of text) {
    char = char.toLowerCase();
    const code: number = char.charCodeAt(0);
    if (code >= codea && codea + 25 >= code) {
      result.push(char);
    } else if (cyrillicToLatinMap[char]) {
      result.push(cyrillicToLatinMap[char]);
    } else if (result.at(-1) !== "-") {
      result.push("-");
    }
  }

  if (result.at(-1) === "-") result.pop();
  return result.join("");
}
