"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkMissingParams = {
    checkMonthParam: (req, res, next) => {
        if (!req.query.month) {
            return res.status(400).json({ error: "Please provide a month" });
        }
        const month = parseInt(req.query.month, 10);
        if (isNaN(month) || month < 1 || month > 12) {
            return res.status(400).json({ error: "Invalid month parameter" });
        }
        next();
    },
};
exports.default = checkMissingParams;
//# sourceMappingURL=checkMissingParams.js.map