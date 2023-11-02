import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  //console.error(error);

  return (
    <div id="error-page" className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Oops!</h1>
      <p className="text-2xl mb-6">Sorry, an unexpected error has occurred.</p>
      <p className="text-2xl">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}