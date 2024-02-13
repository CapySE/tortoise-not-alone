"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmailPasswordBoxProps {
  setPasswordMatch: (isMatch: boolean) => void;
  setPasswordValid: (isValid: boolean) => void;
  setEmailValid: (isValid: boolean) => void;
  setEmailAlreadyReg: (isValid: boolean) => void;
}

export default function EmailPasswordBox(props: EmailPasswordBoxProps) {
  const checkConfirmPassword = (props: EmailPasswordBoxProps) => {
    const password = document.getElementById("Password") as HTMLInputElement;
    const confirmPassword = document.getElementById(
      "Confirm Password",
    ) as HTMLInputElement;
    if (!!confirmPassword && !!password && confirmPassword.value != "") {
      if (password.value == confirmPassword.value) {
        (document.getElementById("message") as HTMLInputElement).style.color =
          "green";
        (document.getElementById("message") as HTMLInputElement).innerHTML = "";
        props.setPasswordMatch(true);
      } else {
        (document.getElementById("message") as HTMLInputElement).style.color =
          "red";
        (document.getElementById("message") as HTMLInputElement).innerHTML =
          "not matching";
        props.setPasswordMatch(false);
      }
    }
  };

  const checkValidPassword = (props: EmailPasswordBoxProps) => {
    const password = document.getElementById("Password") as HTMLInputElement;
    if (!!password) {
      if (password.value.length >= 8) {
        // add additional condition here
        props.setPasswordValid(true);
      } else {
        props.setPasswordValid(false);
      }
    }
  };

  const checkValidEmail = (props: EmailPasswordBoxProps) => {
    const email = document.getElementById("Email") as HTMLInputElement;
    if (!!email) {
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      console.log(
        `check email: ${email.value} \n valid = `,
        email.value.match(validRegex),
      ); //DEBUGGING
      if (email.value.match(validRegex)) {
        props.setEmailValid(true);
      } else {
        props.setEmailValid(false);
      }

      if (true) {
        // add condition here
        props.setEmailAlreadyReg(true);
      } else {
        props.setEmailAlreadyReg(false);
      }
    }
  };

  return (
    <Card className="h-[430px] w-full min-w-[255px] max-w-[633px] justify-center rounded-3xl border-solid border-primary-500 bg-white p-6 sm:h-[388px]">
      <CardContent className="flex h-full w-full justify-center p-0">
        <form className="flex h-full w-full max-w-[420px] flex-col gap-y-2">
          <div className="flex w-full flex-col gap-y-1.5">
            <Label htmlFor="Email">Email</Label>
            <Input
              id="Email"
              placeholder="Enter your Email"
              onKeyUp={() => {
                checkValidEmail(props);
              }}
            />
          </div>
          <div className="flex w-full flex-col gap-y-1.5">
            <Label htmlFor="Password">Password</Label>
            <Input
              type="password"
              id="Password"
              placeholder="Enter your password"
              onKeyUp={() => {
                checkConfirmPassword(props);
                checkValidPassword(props);
              }}
            />
          </div>
          <div className="body5">
            The password must be at least 8 characters
          </div>
          <div className="flex w-full flex-col gap-y-1.5">
            <Label htmlFor="Confirm Password">Confirm Password</Label>
            <Input
              type="password"
              id="Confirm Password"
              placeholder="Enter your password"
              onKeyUp={() => {
                checkConfirmPassword(props);
                checkValidPassword(props);
              }}
            />
          </div>
          <span id="message"></span>
        </form>
      </CardContent>
    </Card>
  );
}
