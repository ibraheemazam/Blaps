// anytime a component is mutating the database, put it here

import fetcher from "./fetcher";

export const auth = (
  mode: "signin" | "signup",
  body: { email: string; password: string }
) => {
  return fetcher(mode, body);
};
