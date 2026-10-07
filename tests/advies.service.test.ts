import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../repositories/advies.repository.js", () => ({
  AdviesRepository: {
    getProfiel: vi.fn(),
    deleteAdvies: vi.fn(),
    saveAdvies: vi.fn(),
  },
}));

vi.mock("../repositories/boek.repository.js", () => ({
  BookRepository: {
    getFiltered: vi.fn(),
    getById: vi.fn(),
  },
}));

import { AdviesService } from "../service/advies.service.js";
import { AdviesRepository } from "../repositories/advies.repository.js";
import { BookRepository } from "../repositories/boek.repository.js";

// ---------- helpers ----------
const makeBook = (id: string, themas?: string) => ({
  _id: { toString: () => id },
  Themas_boek: themas,
});

const makeProfiel = (overrides = {}) => ({
  taalniveau: "F2",
  genre: JSON.stringify(["WOII"]),
  onderwerp: JSON.stringify([]),
  ...overrides,
});

const STUDENT_ID = "student-1";

beforeEach(() => {
  vi.resetAllMocks();
  vi.mocked(BookRepository.getById).mockImplementation(async (id: string) => ({
    _id: id,
    titel: `Boek ${id}`,
  }) as any);
});

// ---------- tests ----------
describe("AdviesService.genereerAdvies", () => {
  describe("profiel", () => {
    it("geeft een 404-fout terug als er geen leesprofiel is", async () => {
      vi.mocked(AdviesRepository.getProfiel).mockResolvedValue(null as any);

      const result = await AdviesService.genereerAdvies(STUDENT_ID);

      expect(result).toEqual({ error: "Geen leesprofiel gevonden", status: 404 });
      expect(BookRepository.getFiltered).not.toHaveBeenCalled();
      expect(AdviesRepository.saveAdvies).not.toHaveBeenCalled();
    });

    it("gooit een fout bij ongeldige JSON in het profiel (randgeval)", async () => {
      vi.mocked(AdviesRepository.getProfiel).mockResolvedValue(
        makeProfiel({ genre: "geen-json" }) as any
      );

      await expect(AdviesService.genereerAdvies(STUDENT_ID)).rejects.toThrow();
    });
  });

  describe("niveau-filter (matchNiveau)", () => {
    it.each([
      ["F2-F3", ["2F-3F", "F2", "F3"]],
      ["F2", ["2F"]],
      ["F3", ["3F"]],
      ["F3+", ["3F+"]],
      ["1F", ["1F"]], // onbekend niveau wordt doorgegeven zoals het is
    ])("vertaalt niveau %s naar %j", async (niveau, verwacht) => {
      vi.mocked(AdviesRepository.getProfiel).mockResolvedValue(
        makeProfiel({ taalniveau: niveau }) as any
      );
      vi.mocked(BookRepository.getFiltered).mockResolvedValue([]);

      await AdviesService.genereerAdvies(STUDENT_ID);

      expect(BookRepository.getFiltered).toHaveBeenCalledWith(
        expect.objectContaining({ Niveau: { $in: verwacht } })
      );
    });

    it("filtert alleen op type materiaal 'Boek'", async () => {
      vi.mocked(AdviesRepository.getProfiel).mockResolvedValue(makeProfiel() as any);
      vi.mocked(BookRepository.getFiltered).mockResolvedValue([]);

      await AdviesService.genereerAdvies(STUDENT_ID);

      expect(BookRepository.getFiltered).toHaveBeenCalledWith(
        expect.objectContaining({
          "Type materiaal": { $regex: "^Boek", $options: "i" },
        })
      );
    });
  });

  describe("thema-matching", () => {
    it("zet boeken die op thema matchen vóór boeken die niet matchen", async () => {
      vi.mocked(AdviesRepository.getProfiel).mockResolvedValue(
        makeProfiel({ genre: JSON.stringify(["WOII"]) }) as any
      );
      vi.mocked(BookRepository.getFiltered).mockResolvedValue([
        makeBook("a", "kookboek, sport"),   // geen match
        makeBook("b", "Oorlog en verlies"), // match (hoofdletterongevoelig)
        makeBook("c", "onderduik"),         // match
      ] as any);

      const { advies } = (await AdviesService.genereerAdvies(STUDENT_ID)) as any;

      expect(advies.map((a: any) => a.bookId)).toEqual(["b", "c", "a"]);
    });

    it("combineert genre en onderwerp voor het matchen", async () => {
      vi.mocked(AdviesRepository.getProfiel).mockResolvedValue(
        makeProfiel({
          genre: JSON.stringify(["detective"]),
          onderwerp: JSON.stringify(["welzijn"]),
        }) as any
      );
      vi.mocked(BookRepository.getFiltered).mockResolvedValue([
        makeBook("x", "geen match"),
        makeBook("y", "hoop"),        // via welzijn
        makeBook("z", "mysterie"),    // via detective
      ] as any);

      const { advies } = (await AdviesService.genereerAdvies(STUDENT_ID)) as any;

      expect(advies.slice(0, 2).map((a: any) => a.bookId)).toEqual(["y", "z"]);
    });

    it("valt terug op alle boeken als het thema niet in de mapping staat", async () => {
      vi.mocked(AdviesRepository.getProfiel).mockResolvedValue(
        makeProfiel({ genre: JSON.stringify(["onbekend-thema"]) }) as any
      );
      vi.mocked(BookRepository.getFiltered).mockResolvedValue([
        makeBook("a", "oorlog"),
        makeBook("b", "reizen"),
      ] as any);

      const { advies } = (await AdviesService.genereerAdvies(STUDENT_ID)) as any;

      expect(advies.map((a: any) => a.bookId)).toEqual(["a", "b"]);
    });

    it("crasht niet als een boek geen Themas_boek heeft (randgeval)", async () => {
      vi.mocked(AdviesRepository.getProfiel).mockResolvedValue(makeProfiel() as any);
      vi.mocked(BookRepository.getFiltered).mockResolvedValue([
        makeBook("a", undefined),
        makeBook("b", "oorlog"),
      ] as any);

      const { advies } = (await AdviesService.genereerAdvies(STUDENT_ID)) as any;

      expect(advies.map((a: any) => a.bookId)).toEqual(["b", "a"]);
    });
  });

  describe("selectie van boeken", () => {
    it("geeft maximaal 3 boeken terug", async () => {
      vi.mocked(AdviesRepository.getProfiel).mockResolvedValue(makeProfiel() as any);
      vi.mocked(BookRepository.getFiltered).mockResolvedValue(
        ["a", "b", "c", "d", "e"].map(id => makeBook(id, "oorlog")) as any
      );

      const { advies } = (await AdviesService.genereerAdvies(STUDENT_ID)) as any;

      expect(advies).toHaveLength(3);
    });

    it("geeft geen dubbele boeken terug", async () => {
      vi.mocked(AdviesRepository.getProfiel).mockResolvedValue(makeProfiel() as any);
      // Zelfde boek komt zowel in themaBoeken als alleBoeken voor
      vi.mocked(BookRepository.getFiltered).mockResolvedValue([
        makeBook("a", "oorlog"),
        makeBook("b", "oorlog"),
        makeBook("c", "oorlog"),
      ] as any);

      const { advies } = (await AdviesService.genereerAdvies(STUDENT_ID)) as any;
      const ids = advies.map((a: any) => a.bookId);

      expect(new Set(ids).size).toBe(ids.length);
    });

    it("geeft minder dan 3 boeken terug als er minder beschikbaar zijn (randgeval)", async () => {
      vi.mocked(AdviesRepository.getProfiel).mockResolvedValue(makeProfiel() as any);
      vi.mocked(BookRepository.getFiltered).mockResolvedValue([makeBook("a", "oorlog")] as any);

      const { advies } = (await AdviesService.genereerAdvies(STUDENT_ID)) as any;

      expect(advies).toHaveLength(1);
    });

    it("geeft een lege lijst terug als er geen boeken zijn (randgeval)", async () => {
      vi.mocked(AdviesRepository.getProfiel).mockResolvedValue(makeProfiel() as any);
      vi.mocked(BookRepository.getFiltered).mockResolvedValue([]);

      const { advies } = (await AdviesService.genereerAdvies(STUDENT_ID)) as any;

      expect(advies).toEqual([]);
      expect(AdviesRepository.saveAdvies).toHaveBeenCalledWith(STUDENT_ID, []);
    });
  });

  describe("resultaat en opslag", () => {
    it("bevat volledige boekdata en een reden met niveau en thema's", async () => {
      vi.mocked(AdviesRepository.getProfiel).mockResolvedValue(
        makeProfiel({ taalniveau: "F3", genre: JSON.stringify(["WOII"]) }) as any
      );
      vi.mocked(BookRepository.getFiltered).mockResolvedValue([makeBook("a", "oorlog")] as any);

      const { advies } = (await AdviesService.genereerAdvies(STUDENT_ID)) as any;

      expect(BookRepository.getById).toHaveBeenCalledWith("a");
      expect(advies[0].book).toEqual({ _id: "a", titel: "Boek a" });
      expect(advies[0].reason).toContain("F3");
      expect(advies[0].reason).toContain("WOII");
    });

    it("verwijdert eerst het oude advies en slaat daarna het nieuwe op", async () => {
      vi.mocked(AdviesRepository.getProfiel).mockResolvedValue(makeProfiel() as any);
      vi.mocked(BookRepository.getFiltered).mockResolvedValue([makeBook("a", "oorlog")] as any);

      await AdviesService.genereerAdvies(STUDENT_ID);

      expect(AdviesRepository.deleteAdvies).toHaveBeenCalledWith(STUDENT_ID);
      expect(AdviesRepository.saveAdvies).toHaveBeenCalledWith(STUDENT_ID, [
        { bookId: "a", reason: expect.stringContaining("F2") },
      ]);

      const deleteOrder = vi.mocked(AdviesRepository.deleteAdvies).mock.invocationCallOrder[0]!;
const saveOrder = vi.mocked(AdviesRepository.saveAdvies).mock.invocationCallOrder[0]!;
expect(deleteOrder).toBeLessThan(saveOrder);
    });
  });
});