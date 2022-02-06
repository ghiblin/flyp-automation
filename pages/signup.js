import Head from "next/head";
import { useState } from "react";
import Button from "../components/button";
import Form from "../components/form";
import Input from "../components/input";
import Select from "../components/select";
import { COUNTRIES, GENDERS } from "../utils";

function signupApi(data) {
  return fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export default function SignUp() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    gender: "",
    country: "",
  });
  const { firstName, lastName, email, userName, password, gender, country } =
    values;

  const onChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const isButtonDisabled = !Object.values(values).every((value) =>
    Boolean(value)
  );

  const signup = (e) => {
    e.preventDefault();
    signupApi(values).then((json) => {
      window.alert(JSON.stringify(json, null, 2));
    });
  };
  return (
    <>
      <Head>
        <title>Sign Up to Poshmark</title>
      </Head>
      <div className="w-full max-w-md mx-auto my-10">
        <Form onSubmit={signup}>
          <Input
            label="First Name"
            name="firstName"
            placeholder="John"
            value={firstName}
            onChange={onChange}
          />
          <Input
            label="Last Name"
            name="lastName"
            placeholder="Doe"
            value={lastName}
            onChange={onChange}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="jonh.doe@example.com"
            value={email}
            onChange={onChange}
          />
          <Input
            label="User Name"
            name="userName"
            placeholder="jonh.doe"
            value={userName}
            onChange={onChange}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
          <Select
            name="gender"
            label="Gender"
            value={gender}
            onChange={onChange}
            options={GENDERS}
          />
          <Select
            name="country"
            label="Country"
            value={country}
            onChange={onChange}
            options={COUNTRIES}
          />
          <div>
            <Button type="submit" disabled={isButtonDisabled}>
              Sign Up!
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
