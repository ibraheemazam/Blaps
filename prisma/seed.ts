import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { artistsData } from "./artistsData";

const prisma = new PrismaClient();

// artistsData.forEach(async (artist) => {
//   await prisma.artist.upsert({
//     where: { name: artist.name },
//     update: {},
//     create: {
//       name: artist.name,
//       songs: {
//         create: artist.songs.map((song) => ({
//           name: song.name,
//           duration: song.duration,
//           url: song.url,
//         })),
//       },
//     },
//   });
// });

const run = async () => {
  await Promise.all(
    artistsData.map(async (artist) => {
      return prisma.artist.upsert({
        where: { name: artist.name },
        update: {},
        create: {
          name: artist.name,
          songs: {
            create: artist.songs.map((song) => ({
              name: song.name,
              duration: song.duration,
              url: song.url,
            })),
          },
        },
      })
    })
  )

  const salt = bcrypt.genSaltSync();
  const user = await prisma.user.upsert({
    where: { email: "test@gmail.com" },
    update: {},
    create: {
      email: "test@gmail.com",
      password: bcrypt.hashSync("password", salt),
    },
  });

  console.log(user);

  const songs = await prisma.song.findMany({})
  await Promise.all(
    new Array(10).fill(1).map(async (_, i) => {
      return prisma.playlist.create({
        data: {
          name: `Playlist #${i + 1}`,
          user: {
            connect: { id: user.id },
          },
          songs: {
            connect: songs.map((song) => ({
              id: song.id,
            })),
          },
        },
      })
    })
  )
}

run()
  .catch((e) => {
    console.error("Error while running DB\n", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });