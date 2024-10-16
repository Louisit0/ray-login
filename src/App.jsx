import { useState, useEffect } from "react";

function App() {
  const [haveAccount, setHaveAccount] = useState(false);
  //form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const changeForm = () => {
    setHaveAccount(!haveAccount);
    setName("");
    setEmail("");
    setPassword("");
    setFormError("");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);

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
      console.log("Iniciando sesión con:", { email, password });
      setFormError("");
    } else {
      console.log("Registrando usuario:", { name, email, password });
      setFormError("");
    }
    // Aquí podrías hacer el envío de los datos a tu backend
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-slate-50">
      {haveAccount === true ? (
        <div className="flex flex-col border w-1/4 p-8 gap-4 rounded-xl bg-white">
          <h1 className="text-3xl font-bold text-red-600">RAY SIGNIN</h1>
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
          <p className={`text-red-600 font-medium`}>{formError}</p>
          <button
            type="submit"
            onClick={submit}
            className="bg-red-600 hover:bg-red-500 p-2 rounded text-white font-bold uppercase"
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
        <div className="flex flex-col border w-1/4 p-8 gap-4 rounded-xl bg-white">
          <h1 className="text-3xl font-bold text-red-600">RAY SIGNUP</h1>
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
          <p className={`text-red-600 font-medium`}>{formError}</p>
          <button
            type="submit"
            onClick={submit}
            className="bg-red-600 hover:bg-red-500 p-2 rounded text-white font-bold uppercase"
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
    </div>
  );
}

export default App;
