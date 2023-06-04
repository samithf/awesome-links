// pages/api/auth/hook.ts
import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Helloooooo >>>>>>>>>>>>");
  const { email, secret } = req.body;
  console.log({ email, secret });
  console.log("local secret >>", process.env.AUTH0_HOOK_SECRET);
  console.log("typeof secret >>>", typeof secret);
  console.log(
    "typeof process.env.AUTH0_HOOK_SECRET >>>",
    typeof process.env.AUTH0_HOOK_SECRET
  );

  // 1
  if (req.method !== "POST") {
    console.log("1111111 >>>>>>>>>>>>");

    return res.status(403).json({ message: "Method not allowed" });
  }
  // 2
  //   if (secret !== process.env.AUTH0_HOOK_SECRET) {
  //     console.log("22222222 >>>>>>>>>>>>");

  //     return res.status(403).json({ message: `You must provide the secret 🤫` });
  //   }
  // 3
  if (email) {
    console.log("33333333333 >>>>>>>>>>>>");

    // 4
    await prisma.user.create({
      data: { email },
    });
    return res.status(200).json({
      message: `User with email: ${email} has been created successfully!`,
    });
  }
};

export default handler;
