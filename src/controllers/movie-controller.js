import { prisma } from "../helpers/utils.js";

export const index = async (req, reply) => {
  try {
    const movies = await prisma.movie.findMany();
    reply.status(200).send(movies);
  } catch (error) {
    console.error(error);
    reply.status(500).send(error);
  }
};

export const getMovie = async (req, reply) => {
  const { id } = req.params;
  try {
    const movie = await prisma.movie.findUnique({
      where: { id: parseInt(id) },
    });
    reply.status(200).send(movie);
  } catch (error) {
    console.error(error);
    reply.status(500).send(error);
  }
};

export const create = async (req, reply) => {
  const {
    user: { id: user_id },
  } = req;
  const { title, description, gender_id } = req.body;

  try {
    const movie = await prisma.movie.create({
      data: {
        title,
        description,
        gender: {
          connect: {
            id: parseInt(gender_id),
          },
        },
        user: {
          connect: {
            id: parseInt(user_id),
          },
        },
      },
      select: {
        title: true,
        description: true,
        gender: true,
      },
    });
    reply.status(201).send(movie);
  } catch (error) {
    console.error(error);
    reply.status(500).send(error);
  }
};
