import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function Form() {
  const [haveAccount, setHaveAccount] = useState(true);
  // Form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  // Hook de navegación de Wouter
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLocation("/home");
    }
  }, [setLocation]);

  const changeForm = () => {
    setHaveAccount(!haveAccount);
    setName("");
    setEmail("");
    setPassword("");
    setFormError("");
    setFormSuccess("");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const login = () => {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setLocation("/home");
        } else {
          setFormError("Credenciales incorrectas");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const createAccount = () => {
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.userId) {
          setFormError("");
          setEmail("");
          setPassword("");
          setHaveAccount(true);
          setFormSuccess("Account created successfully");
        } else {
          setFormError("Already an existing account with this email.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setFormError("Couldn't create the account.");
      });
  };

  const submit = (event) => {
    event.preventDefault();

    if (!email || !password || (!haveAccount && !name)) {
      setFormError("Fill in the form");
      return;
    }

    if (!haveAccount && name.length < 3) {
      setFormError("Name should at least have 3 letters.");
      return;
    }

    if (password.length < 5) {
      setFormError("Password should at least have 5 characters.");
      return;
    }

    if (haveAccount) {
      login();
    } else {
      createAccount();
    }

    setFormError("");
  };

  return (
    <>
      {haveAccount ? (
        <LoginForm
          email={email}
          password={password}
          handleInputChange={handleInputChange}
          submit={submit}
          changeForm={changeForm}
          formError={formError}
          formSuccess={formSuccess}
        />
      ) : (
        <SignUpForm
          name={name}
          email={email}
          password={password}
          handleInputChange={handleInputChange}
          submit={submit}
          changeForm={changeForm}
          formError={formError}
          formSuccess={formSuccess}
        />
      )}
    </>
  );
}

export default Form;
