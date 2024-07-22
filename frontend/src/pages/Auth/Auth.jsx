import "./Auth.css";
import { Button } from "@/components/ui/button";
import SignupForm from "./signup/SignupForm";
import LoginForm from "./login/login";
import { useState } from "react";

const Auth = () => {
  const [active, setActive] = useState(false);
  return (
    <div className="loginContainer">
      <div className="box h-[30rem] w-[25rem] ">
        <div className="minContainer login ">
          <div className="loginBox w-full px-10 space-y-5">
            {active ? <SignupForm /> : <LoginForm />}
            <div className="flex items-center justify-center">
              <span>
                {active ? "Already have an account?" : "Don't have an account?"}
              </span>
              <Button
                onClick={() => setActive(!active)}
                variant="link"
                className="text-red-400 text-base py-2 px-1"
              >
                {active ? "Log in" : "Sign up"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
