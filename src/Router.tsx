import { Route, Routes } from "react-router-dom";
import Coins from "./Coins";
import Coin from "./Coin";

const Router = () => {
  return (
    <Routes>
      <Route path="/:coinId" element={<Coin />} />
      <Route path="/" element={<Coins />} />
    </Routes>
  );
};

export default Router;
