export interface BibleVerse {
  number: number;
  text: string;
}

export interface BibleChapter {
  chapter: number;
  verses: BibleVerse[];
}

export interface BibleBook {
  id: string;
  abbrev: string;
  name: string;
  author: string;
  group: string;
  testament: "VT" | "NT";
  version: string;
  chapters: BibleChapter[];
}
