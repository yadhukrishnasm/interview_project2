import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Hardcoded credentials
    const validEmail = "staff@clinic.com";
    const validPassword = "123456";

    if (email === validEmail && password === validPassword) {
      console.log("Login successful");
      setError("");
      navigate('/dashboard')
      
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="dark:bg-black md:w-[40vw] md:py-40 border bg-zinc-100 md:px-40 px-10 py-10 rounded-xl dark:text-white ">
        <div>
          <p className="font-bold md:text-6xl text-4xl md:mb-20 text-center text-red-500 mb-10">
            Login
          </p>

          <form className="space-y-4" onSubmit={handleLogin}>
            <label>Username</label>
            <Input
              placeholder="username/registered emailID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p className="text-red-500 font-semibold text-center">{error}</p>
            )}

            <Button
              className="w-full mt-5 text-xl md:py-8 py-5 cursor-pointer font-bold "
              type="submit"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
