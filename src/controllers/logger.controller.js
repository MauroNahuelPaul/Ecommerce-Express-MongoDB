import { logger } from "../utils.js"

export const loggerController = async (req, res) => {
    try {
        logger.debug("Debug");
        logger.http("Http");
        logger.info("Info");
        logger.warning("Warning");
        logger.error("Error");
        logger.fatal("Fatal");
        res.json({ status: "success" });
    } catch (error) {
        logger.fatal(error.message);
        res.status(500).json({ status: error.message });
    }
}