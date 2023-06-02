import { Dispatch, SetStateAction } from "react";
import MainPage from "./pages/main";

interface IAppProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
}

function App({ username, setUsername }: IAppProps) {
  return <MainPage username={username} setUsername={setUsername} />;
}

export default App;
