import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  let user;

  try {
    user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
  } catch {
    res.status(401);
    // only throws an error if the email field was empty
    return res.json({ error: "Please enter a valid email" });
  }

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
        time: Date.now(),
      },
      "hello",
      { expiresIn: "8h" }
    );

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('BLAPS_ACCESS_TOKEN', token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    );

    res.json(user);
  } else {
    res.status(401);
    if (!user) {
      res.json({ error: "No user found by that email" });
    } else {
      res.json({ error: "Password was incorrect" });
    }
  }
};
