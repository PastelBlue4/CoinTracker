import { Route, Routes } from "react-router-dom";
import Coins from "./Coins";

const Router = () => {
  return (
    <Routes>
      <Route path="/coins" element={<Coins />} />
    </Routes>
  );
};

export default Router;
