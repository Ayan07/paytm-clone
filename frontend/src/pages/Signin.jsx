import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Signin = () => {
  return (
    <div className="h-screen bg-slate-300 flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="w-80 rounded-lg bg-white p-2 px-4 text-center h-max">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) => setUserName(e.target.value)}
            label={"Email"}
            placeholder={"aryanp@gmail.com"}
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            label={"Password"}
            placeholder={""}
          />
          <div className="pt-4">
            <Button
              label={"Sign In"}
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signin",
                  {
                    userName,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.json);
              }}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            btnText={"Sign Up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
