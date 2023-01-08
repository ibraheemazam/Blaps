import { Router, useRouter } from "next/router";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { Input, Button } from "@chakra-ui/react";
import NextImage from "next/image";
import { auth } from "../lib/mutations";
// can use to update local cache -- made by next team

export default function AuthForm({ mode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    await auth(mode, { email, password });
    setIsLoading(false);
    router.push('/');
  }

  return (
    <div className="authFormContainer">
      <div className="navBar">
        <NextImage src="/logo.svg" height={60} width={120} />
      </div>
      <div className="main">
        <div>
          <form className="formContainer" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" isLoading={isLoading}> {mode}</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
