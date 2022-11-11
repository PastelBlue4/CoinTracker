import { useQuery } from "react-query";
import styled from "styled-components";
import fetchCoins from "./api";

const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

function Coins() {
  interface ICoin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
  }
  const { isLoading, data } = useQuery<ICoin[]>("fetchCoins", fetchCoins);
  console.log(isLoading, data);
  return (
    <div>
      {data?.slice(0, 100).map((item) => (
        <Coin data={item} />
      ))}
    </div>
  );
}

export default Coins;
