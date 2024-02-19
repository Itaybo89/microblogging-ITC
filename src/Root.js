
import App from "./App";
import AppContextProvider from "./MyContext";

function Root() {
  return (
    <AppContextProvider>
      <App />
    </AppContextProvider>
  );
}

export default Root;
