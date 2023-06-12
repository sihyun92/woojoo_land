import { useState } from "react";
import SettingAuth from "../../components/user/UserSettingAuth";
import Settings from "../../components/user/UserSettings";

function SettingPage() {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      {isChecked ? <Settings /> : <SettingAuth setIsChecked={setIsChecked} />}
    </>
  );
}

export default SettingPage;
