interface CyrillicToLatinMap {
  [key: string]: string;
}
// транслируемые символы
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
  щ: "sch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
};

// доступные символы согласно RFC 3986
const chars = new Set<string>();
const codea = "a".charCodeAt(0);
for (let i = 0; i < 26; i++) {
  chars.add(String.fromCharCode(codea + i));
}
for (let i = 0; i < 10; i++) {
  chars.add("" + i);
}
for (const char of ["-", "_", ".", "!", "~", "*", "'", "(", ")"]) {
  chars.add(char);
}

/**
 * Преобразование строки utf8 в транслит согласно
 * https://ru.wikipedia.org/wiki/Транслит
 * @param text строка которыю нужно превратить в транслит
 * @returns
 */
export function translite(text: string): string {
  const result: string[] = [];

  for (let char of text) {
    char = char.toLowerCase();

    if (chars.has(char)) {
      result.push(char);
    } else if (cyrillicToLatinMap[char]) {
      result.push(cyrillicToLatinMap[char]);
    } else if (result.at(-1) !== "-") {
      result.push("-");
    }
  }

  if (result.at(-1) === "-") {
    result.pop();
  }
  return result.join("");
}
