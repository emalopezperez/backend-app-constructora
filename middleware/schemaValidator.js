const { ZodError } = require("zod");

const schemaValition = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        res.status(400).json(
          error.issues.map((issue) => ({
            path: issue.path,
            message: issue.message,
          }))
        );
      } else {
        res.status(400).json({ message: "internal server error" });
      }
    }
  };
};

module.exports = { schemaValition };
