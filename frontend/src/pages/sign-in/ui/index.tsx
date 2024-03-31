import { TextInput } from "@tremor/react";
import { useState } from "react";
import { authService } from "../../../api.auth";

export const SignInPage = () => {
  const [inputData, setInputData] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    authService.login('toga', 'toga')
      .then(response => {
        // Обработка успешного ответа от сервера
        console.log("Успешный ответ: ", response.data);
        localStorage.setItem("token", response.data.token);
      })
      .catch(error => {
        // Обработка ошибки
        console.error("Ошибка при отправке запроса: ", error);
      });
  };
  return (
    <main className="max-w-4xl mx-auto my-12">
      <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
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
