interface CookieOptionsTypes {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "None" | "Strict" | "Lax";
  expires: Date;
}

export const cookieOptions: CookieOptionsTypes = {
  httpOnly: true,
  secure: true,
  sameSite: "Strict",
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15),
};
