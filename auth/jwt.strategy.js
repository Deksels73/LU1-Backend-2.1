import fastifyPassport from "@fastify/passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { TeacherRepository } from "../repositories/teacher.repository.js";
import { StudentRepository } from "../repositories/student.repository.js";
export function registerJwtStrategy() {
    fastifyPassport.use("jwt", new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
    }, async (payload, done) => {
        try {
            const result = payload.role === "teacher"
                ? await TeacherRepository.findByName(payload.name)
                : await StudentRepository.findByName(payload.name);
            const user = result[0];
            if (!user)
                return done(null, false);
            return done(null, {
                id: user.id,
                name: user.name,
                role: payload.role,
            });
        }
        catch (err) {
            return done(err, false);
        }
    }));
}
//# sourceMappingURL=jwt.strategy.js.map