// import { AdviesRepository } from "../repositories/advies.repository.js";
// import { BookRepository } from "../repositories/boek.repository.js";


// function matchNiveau(niveau: string) {
//   if (niveau === "F2-F3") return ["2F-3F", "F2", "F3"];
//   if (niveau === "F2") return ["2F"];
//   if (niveau === "F3") return ["3F"];
//   if (niveau === "F3+") return ["3F+"];
//   return [niveau];
// }
// const themaMapping: Record<string, string[]> = {
//   historisch: [
//     "oorlog", "verlies", "onderduik", "familie", "herinneringen", "biografie"
//   ],

//   avontuur: [
//     "doorzetten", "veerkracht", "reizen", "cultuur", "ontwikkeling"
//   ],

//   WOII: [
//     "oorlog", "onderduik", "verlies", "familie", "moraal"
//   ],

//   detective: [
//     "mysterie", "thriller", "onderzoek", "criminaliteit", "geheimen"
//   ],

//   welzijn: [
//     "geluk", "zingeving", "zelfreflectie", "inzicht", "hoop"
//   ],

//   vriendschap: [
//     "vriendschap", "verbondenheid", "ontwikkeling", "opgroeien", "veerkracht"
//   ]
// };



// export const AdviesService = {
//   async genereerAdvies(studentId: string) {
//     const profiel = await AdviesRepository.getProfiel(studentId);
//     if (!profiel) return { error: "Geen leesprofiel gevonden", status: 404 };

//     const genre = JSON.parse(profiel.genre);
//     const onderwerp = JSON.parse(profiel.onderwerp);

//     const thema = [...genre, ...onderwerp];
//     const mappedThema = thema.flatMap(t => themaMapping[t] || []);


// const filters: any = {
//   "Type materiaal": { $regex: "^Boek", $options: "i" },
//   Niveau: { $in: matchNiveau(profiel.taalniveau) }
// };

// if (mappedThema.length > 0) {
//   filters.Themas_boek = {
//     $regex: mappedThema.join("|"),
//     $options: "i"
//   };
// }



//     const boeken = await BookRepository.getFiltered(filters);
//     const top3 = boeken.slice(0, 3);

//     const advies = top3.map(book => ({
//       bookId: book._id.toString(),
//       reason: `Dit boek past bij jouw taalniveau (${profiel.taalniveau}) en jouw thema's (${thema.join(", ")}).`
//     }));

//     await AdviesRepository.saveAdvies(studentId, advies);

//     return { advies };
//   }
// };

import { AdviesRepository } from "../repositories/advies.repository.js";
import { BookRepository } from "../repositories/boek.repository.js";

function matchNiveau(niveau: string) {
  if (niveau === "F2-F3") return ["2F-3F", "F2", "F3"];
  if (niveau === "F2") return ["2F"];
  if (niveau === "F3") return ["3F"];
  if (niveau === "F3+") return ["3F+"];
  return [niveau];
}

const themaMapping: Record<string, string[]> = {
  historisch: ["oorlog", "verlies", "onderduik", "familie", "herinneringen", "biografie"],
  avontuur: ["doorzetten", "veerkracht", "reizen", "cultuur", "ontwikkeling"],
  WOII: ["oorlog", "onderduik", "verlies", "familie", "moraal"],
  detective: ["mysterie", "thriller", "onderzoek", "criminaliteit", "geheimen"],
  welzijn: ["geluk", "zingeving", "zelfreflectie", "inzicht", "hoop"],
  vriendschap: ["vriendschap", "verbondenheid", "ontwikkeling", "opgroeien", "veerkracht"]
};

export const AdviesService = {
  async genereerAdvies(studentId: string) {
    const profiel = await AdviesRepository.getProfiel(studentId);
    if (!profiel) return { error: "Geen leesprofiel gevonden", status: 404 };

    const genre = JSON.parse(profiel.genre);
    const onderwerp = JSON.parse(profiel.onderwerp);

    const thema = [...genre, ...onderwerp];
    const mappedThema = thema.flatMap(t => themaMapping[t] || []);

    // 1. Basisfilter: type + niveau
    const baseFilters = {
      "Type materiaal": { $regex: "^Boek", $options: "i" },
      Niveau: { $in: matchNiveau(profiel.taalniveau) }
    };

    const alleBoeken = await BookRepository.getFiltered(baseFilters);

    // 2. Thema-matching
    const themaBoeken = alleBoeken.filter(book =>
      mappedThema.some(t =>
        book.Themas_boek?.toLowerCase().includes(t.toLowerCase())
      )
    );

    const uniqueBoeken = [
  ...new Map(
    [...themaBoeken, ...alleBoeken].map(book => [book._id.toString(), book])
  ).values()
];

    // 3. Altijd 3 boeken teruggeven
const top3 = uniqueBoeken.slice(0, 3);


// 4. Volledige boekdata ophalen
const advies = await Promise.all(
  top3.map(async book => {
    const fullBook = await BookRepository.getById(book._id.toString());

    return {
      bookId: book._id.toString(),   // voor opslaan in DB
      book: fullBook,                // voor teruggeven aan frontend
      reason: `Dit boek past bij jouw taalniveau (${profiel.taalniveau}) en jouw thema's (${thema.join(", ")}).`
    };
  })
);

await AdviesRepository.deleteAdvies(studentId);


// 5. Opslaan in database (correct)
await AdviesRepository.saveAdvies(
  studentId,
  advies.map(a => ({
    bookId: a.bookId,
    reason: a.reason
  }))
);

// 6. Teruggeven aan frontend
return { advies };
  }
};

