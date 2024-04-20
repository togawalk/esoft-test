import { Card, TextInput } from "@tremor/react";
import { FormEvent, useState } from "react";
import { authService } from "../../../api.auth";

export const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await authService.login(username, password);

      if (response.data) {
        console.log("Успешный ответ: ", response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.userWithoutPassword.role);
      } else {
        throw new Error("Данные не получены от сервера.");
      }
    } catch (error: any) {
      console.error("Ошибка при отправке запроса: ", error);

      if (error.response && error.response.status === 404) {
        setError("Пользователь не существует");
      } else if (error.response && error.response.status === 401) {
        setError("Неправильный пароль");
      }
    }
  };

  return (
    <main className="max-w-4xl mx-auto my-12">
      <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {error ? (
            <Card className="mb-10">
              <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Упс, что-то случилось
              </h3>
              <p className="mt-2 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                {error}
              </p>
            </Card>
          ) : null}
          <h3 className="text-center text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Log in
          </h3>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Username
              </label>
              <TextInput
                type="text"
                id="username"
                name="username"
                placeholder=""
                className="mt-2"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Password
              </label>
              <TextInput
                type="password"
                id="password"
                name="password"
                autoComplete="password"
                placeholder=""
                className="mt-2"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full whitespace-nowrap rounded-tremor-default bg-tremor-brand py-2 text-center text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};
