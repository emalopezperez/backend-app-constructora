const { z } = require("zod");

const bookSchema = z.object({
  body: z.object({
    author: z.string().min(2),
    title: z.string().min(2),
  }),
});

module.exports = { bookSchema };
