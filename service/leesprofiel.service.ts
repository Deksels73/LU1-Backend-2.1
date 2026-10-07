import { LeesprofielRepository } from "../repositories/leesprofiel.repository.js";

export const LeesprofielService = {
  async save(studentId: string, body: any) {
    if (!body.genre || body.genre.length === 0) {
      return { error: "genre vergeten", status: 400 };
    }

    if (!body.niveau || !body.lengte || !body.leesdoel) {
      return { error: "Niet alle velden zijn ingevuld.", status: 400 };
    }

    await LeesprofielRepository.save(studentId, body);

    return { success: true };
  },

  async get(studentId: string) {
    const profile = await LeesprofielRepository.get(studentId);

    if (!profile) {
      return { error: "geen profiel gevonden", status: 404 };
    }

    return profile;
  },

  async update(studentId: string, data: any) {
    return await LeesprofielRepository.update(studentId, data);
  }
};
