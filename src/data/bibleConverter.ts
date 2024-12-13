import type { BibleBook, BibleChapter, BibleVerse } from "./types";

interface RawBook {
  abbrev: string;
  name: string;
  chapters: string[][];
}

const bookIdMap: { [key: string]: string } = {
  // Velho Testamento
  gn: "GEN",
  ex: "EXO",
  lv: "LEV",
  nm: "NUM",
  dt: "DEU",
  js: "JOS",
  jz: "JDG",
  rt: "RUT",
  "1sm": "1SA",
  "2sm": "2SA",
  "1rs": "1KI",
  "2rs": "2KI",
  "1cr": "1CH",
  "2cr": "2CH",
  ed: "EZR",
  ne: "NEH",
  et: "EST",
  job: "JOB",
  sl: "PSA",
  pv: "PRO",
  ec: "ECC",
  ct: "SNG",
  is: "ISA",
  jr: "JER",
  lm: "LAM",
  ez: "EZK",
  dn: "DAN",
  os: "HOS",
  jl: "JOL",
  am: "AMO",
  ob: "OBA",
  jn: "JON",
  mq: "MIC",
  na: "NAM",
  hc: "HAB",
  sf: "ZEP",
  ag: "HAG",
  zc: "ZEC",
  ml: "MAL",

  // Novo Testamento
  mt: "MAT",
  mc: "MRK",
  lc: "LUK",
  jo: "JHN",
  at: "ACT",
  rm: "ROM",
  "1co": "1CO",
  "2co": "2CO",
  gl: "GAL",
  ef: "EPH",
  fp: "PHP",
  cl: "COL",
  "1ts": "1TH",
  "2ts": "2TH",
  "1tm": "1TI",
  "2tm": "2TI",
  tt: "TIT",
  fm: "PHM",
  hb: "HEB",
  tg: "JAS",
  "1pe": "1PE",
  "2pe": "2PE",
  "1jo": "1JN",
  "2jo": "2JN",
  "3jo": "3JN",
  jd: "JUD",
  ap: "REV",
};

const authorMap: { [key: string]: string } = {
  // Velho Testamento
  Gênesis: "Moisés",
  Êxodo: "Moisés",
  Levítico: "Moisés",
  Números: "Moisés",
  Deuteronômio: "Moisés",
  Josué: "Josué",
  Juízes: "Samuel",
  Rute: "Samuel",
  "1º Samuel": "Samuel",
  "2º Samuel": "Samuel",
  "1º Reis": "Jeremias",
  "2º Reis": "Jeremias",
  "1º Crônicas": "Esdras",
  "2º Crônicas": "Esdras",
  Esdras: "Esdras",
  Neemias: "Neemias",
  Ester: "Desconhecido",
  Jó: "Desconhecido",
  Salmos: "Vários (incluindo Davi)",
  Provérbios: "Salomão",
  Eclesiastes: "Salomão",
  Cânticos: "Salomão",
  Isaías: "Isaías",
  Jeremias: "Jeremias",
  Lamentações: "Jeremias",
  Ezequiel: "Ezequiel",
  Daniel: "Daniel",

  // Novo Testamento
  Mateus: "Mateus",
  Marcos: "Marcos",
  Lucas: "Lucas",
  João: "João",
  Atos: "Lucas",
  Romanos: "Paulo",
  "1ª Coríntios": "Paulo",
  "2ª Coríntios": "Paulo",
  Gálatas: "Paulo",
  Efésios: "Paulo",
  Filipenses: "Paulo",
  Colossenses: "Paulo",
  "1ª Tessalonicenses": "Paulo",
  "2ª Tessalonicenses": "Paulo",
  "1ª Timóteo": "Paulo",
  "2ª Timóteo": "Paulo",
  Tito: "Paulo",
  Filemom: "Paulo",
  Hebreus: "Desconhecido",
  Tiago: "Tiago",
  "1ª Pedro": "Pedro",
  "2ª Pedro": "Pedro",
  "1ª João": "João",
  "2ª João": "João",
  "3ª João": "João",
  Judas: "Judas",
  Apocalipse: "João",
};

const groupMap: { [key: string]: string } = {
  // Velho Testamento
  Gênesis: "Pentateuco",
  Êxodo: "Pentateuco",
  Levítico: "Pentateuco",
  Números: "Pentateuco",
  Deuteronômio: "Pentateuco",
  Josué: "Históricos",
  Juízes: "Históricos",
  Rute: "Históricos",
  "1º Samuel": "Históricos",
  "2º Samuel": "Históricos",
  "1º Reis": "Históricos",
  "2º Reis": "Históricos",
  "1º Crônicas": "Históricos",
  "2º Crônicas": "Históricos",
  Esdras: "Históricos",
  Neemias: "Históricos",
  Ester: "Históricos",
  Jó: "Poéticos",
  Salmos: "Poéticos",
  Provérbios: "Poéticos",
  Eclesiastes: "Poéticos",
  Cânticos: "Poéticos",
  Isaías: "Profetas maiores",
  Jeremias: "Profetas maiores",
  Lamentações: "Profetas maiores",
  Ezequiel: "Profetas maiores",
  Daniel: "Profetas maiores",
  Oséias: "Profetas menores",
  Joel: "Profetas menores",
  Amós: "Profetas menores",
  Obadias: "Profetas menores",
  Jonas: "Profetas menores",
  Miquéias: "Profetas menores",
  Naum: "Profetas menores",
  Habacuque: "Profetas menores",
  Sofonias: "Profetas menores",
  Ageu: "Profetas menores",
  Zacarias: "Profetas menores",
  Malaquias: "Profetas menores",

  // Novo Testamento
  Mateus: "Evangelhos",
  Marcos: "Evangelhos",
  Lucas: "Evangelhos",
  João: "Evangelhos",
  Atos: "Histórico",
  Romanos: "Cartas",
  "1ª Coríntios": "Cartas",
  "2ª Coríntios": "Cartas",
  Gálatas: "Cartas",
  Efésios: "Cartas",
  Filipenses: "Cartas",
  Colossenses: "Cartas",
  "1ª Tessalonicenses": "Cartas",
  "2ª Tessalonicenses": "Cartas",
  "1ª Timóteo": "Cartas",
  "2ª Timóteo": "Cartas",
  Tito: "Cartas",
  Filemom: "Cartas",
  Hebreus: "Cartas",
  Tiago: "Cartas",
  "1ª Pedro": "Cartas",
  "2ª Pedro": "Cartas",
  "1ª João": "Cartas",
  "2ª João": "Cartas",
  "3ª João": "Cartas",
  Judas: "Cartas",
  Apocalipse: "Apocalíptico",
};

export function convertBibleData(rawData: RawBook[]): BibleBook[] {
  return rawData.map((bookData) => ({
    id: bookIdMap[bookData.abbrev] || bookData.abbrev.toUpperCase(),
    abbrev: bookData.abbrev,
    name: bookData.name,
    author: authorMap[bookData.name] || "Desconhecido",
    group: groupMap[bookData.name] || "Outro",
    testament: determineTestament(groupMap[bookData.name]),
    version: "nvi",
    chapters: convertChapters(bookData.chapters),
  }));
}

function determineTestament(group: string): "VT" | "NT" {
  const vtGroups = [
    "Pentateuco",
    "Históricos",
    "Poéticos",
    "Profetas maiores",
    "Profetas menores",
  ];
  return vtGroups.includes(group) ? "VT" : "NT";
}

function convertChapters(rawChapters: string[][]): BibleChapter[] {
  return rawChapters.map((verses, index) => ({
    chapter: index + 1,
    verses: convertVerses(verses),
  }));
}

function convertVerses(verses: string[]): BibleVerse[] {
  return verses.map((text, index) => ({
    number: index + 1,
    text: text.trim(),
  }));
}

export function validateBibleData(bibleData: BibleBook[]): boolean {
  try {
    for (const book of bibleData) {
      if (!book.id || !book.name || !book.testament) {
        console.error("Livro inválido:", book);
        return false;
      }

      for (const chapter of book.chapters) {
        if (!chapter.chapter || !Array.isArray(chapter.verses)) {
          console.error("Capítulo inválido:", chapter);
          return false;
        }

        for (const verse of chapter.verses) {
          if (!verse.number || !verse.text) {
            console.error("Versículo inválido:", verse);
            return false;
          }
        }
      }
    }
    return true;
  } catch (error) {
    console.error("Erro na validação:", error);
    return false;
  }
}

export default convertBibleData;
