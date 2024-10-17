import InputField from "./InputField";

function LoginForm({
  email,
  password,
  handleInputChange,
  submit,
  changeForm,
  formError,
  formSuccess,
}) {
  return (
    <div className="flex flex-col border w-full md:w-1/3 p-8 gap-4 rounded-xl bg-white">
      <h1 className="text-3xl font-bold">
        <span className="text-red-600">RAY </span>SIGN IN
      </h1>
      <hr />
      <InputField
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={handleInputChange}
      />
      <InputField
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={handleInputChange}
      />
      <p className="text-green-600 font-medium">{formSuccess}</p>
      <p className="text-red-600 font-medium">{formError}</p>
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
    </div>
  );
}

export default LoginForm;
