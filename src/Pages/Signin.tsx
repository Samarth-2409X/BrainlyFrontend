import { useRef, useState } from "react";  
import { Button } from "../Components/Button";
import { Input } from "../Components/Input";
import { BACKEND_URL } from "../Config";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; 

export function Signin() {
  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState<string>(""); 

  async function handleSignin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    setErrorMessage(""); 

    try {
      const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
        username,
        password,
      });

      //@ts-ignore
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/dashbord");

    } catch (error: any) {
      if (error.response && error.response.status === 403) {
       
        setErrorMessage("Incorrect username or password.");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-purple-50 to-purple-100 flex justify-center items-center">
      <div className="bg-white rounded-3xl border min-w-80 p-8 shadow-xl">
        
        <div className="flex flex-col items-center pb-4">
          <div className="font-bold text-3xl text-gray-800">Second Brain</div>
          <div className="text-gray-500 text-sm mt-1">
            Organize your notes, links, documents, and ideas in one place.
          </div>
        </div>

        <div className="flex justify-center items-center pb-4">
          <div className="font-semibold text-xl text-gray-700">Welcome back</div>
        </div>

        <div>
          <Input referance={usernameRef} placeholder="Username" />
          <Input referance={passwordRef} placeholder="Password" />
        </div>

        
        {errorMessage && (
          <div className="text-red-600 text-sm mt-3 text-center">
            {errorMessage}
          </div>
        )}

        <div className="flex justify-center pt-4">
          <Button
            onClick={handleSignin}
            loding={false}
            variant="Primary"
            text="Sign In"
            fullWidth={true}
          />
        </div>

        <div className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
