import { useState, useEffect } from "react";
import { useLocation } from "wouter";

function Form() {
  const [haveAccount, setHaveAccount] = useState(false);
  //form
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
      // Si el usuario ya está autenticado, redirigir a /home
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

    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
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
        // Ahora se espera el token en la respuesta
        if (data.token) {
          // Puedes guardar el token en localStorage o en el estado
          localStorage.setItem("token", data.token); // Guarda el token
          // Redirige a la página de inicio
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
          setHaveAccount(true); // Cambia a la vista de inicio de sesión
          setFormSuccess("Cuenta creada con éxito.");
        } else {
          // Muestra el mensaje de error del servidor
          setFormError("Ya existe un usuario con ese email.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setFormError("Error al crear la cuenta");
      });
  };

  const submit = () => {
    if (!email || !password || (!haveAccount && !name)) {
      setFormError("Complete el formulario");
      return;
    }

    // Validar longitud mínima del nombre y la contraseña
    if (!haveAccount && name.length < 3) {
      setFormError("El nombre debe tener al menos 3 caracteres.");
      return;
    }

    if (password.length < 5) {
      setFormError("La contraseña debe tener al menos 5 caracteres.");
      return;
    }

    if (haveAccount) {
      login();
      setFormError("");
    } else {
      createAccount();
      setFormError("");
    }
  };

  return (
    <>
      {haveAccount === true ? (
        <div className="flex flex-col border w-full md:w-1/3 p-8 gap-4 rounded-xl bg-white">
          <h1 className="text-3xl font-bold">
            <span className="text-red-600">RAY </span>SIGNIN
          </h1>
          <hr />
          <div className="flex flex-col">
            <label className="font-medium">Email</label>
            <input
              className="border rounded-xl p-2"
              type="email"
              name="email"
              id="email"
              placeholder="Your email"
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Password</label>
            <input
              className="border rounded-xl p-2"
              type="password"
              name="password"
              id="password"
              placeholder="Your password"
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <p className={`text-green-600 font-medium`}>{formSuccess}</p>
          <p className={`text-red-600 font-medium`}>{formError}</p>
          <button
            type="submit"
            onClick={submit}
            className="bg-red-600 hover:bg-red-700 p-2 rounded text-white font-bold uppercase"
          >
            Log in
          </button>
          <hr />
          <p className="text-center">
            Don&apos;t have an account?{" "}
            <a
              onClick={changeForm}
              className="font-medium cursor-pointer hover:underline"
            >
              Create now
            </a>
          </p>
          <a></a>
        </div>
      ) : (
        <div className="flex flex-col border w-full md:w-1/3 p-8 gap-4 rounded-xl bg-white">
          <h1 className="text-3xl font-bold">
            <span className="text-red-600">RAY </span>SIGNUP
          </h1>
          <hr />
          <div className="flex flex-col">
            <label>Name</label>
            <input
              className="border rounded-xl p-2"
              type="text"
              name="name"
              id="name"
              placeholder="Your name"
              value={name}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label>Email</label>
            <input
              className="border rounded-xl p-2"
              type="email"
              name="email"
              id="email"
              placeholder="Your email"
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input
              className="border rounded-xl p-2"
              type="password"
              name="password"
              id="password"
              placeholder="Create password"
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <p className={`text-green-600 font-medium`}>{formSuccess}</p>
          <p className={`text-red-600 font-medium`}>{formError}</p>
          <button
            type="submit"
            onClick={submit}
            className="bg-red-600 hover:bg-red-700 p-2 rounded text-white font-bold uppercase"
          >
            Create account
          </button>
          <hr />
          <p className="text-center">
            Have an account?{" "}
            <a
              onClick={changeForm}
              className="font-medium cursor-pointer hover:underline"
            >
              Log in
            </a>
          </p>
          <a></a>
        </div>
      )}
    </>
  );
}

export default Form;
