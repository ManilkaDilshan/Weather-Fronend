import { useContext } from "react";
import { UserContext } from "../context/UserContext";

import Home from "../pages/Home";
import Register from "../pages/Register";

export default function Routes() {
    const {user} = useContext(UserContext);

    if (user) {
      return <Home />;
    }

    return (
      <Register />
    );
  }
