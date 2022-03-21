import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinTitle = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.titleColor};
`;

const Loading = styled.span`
  font-size: 30px;
  text-align: center;
  display: block;
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

function Coin() {
  const [isLoading, setIsLoading] = useState(true);
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const [coinInfo, setCoinInfo] = useState({});
  const [coinPrice, setCoinPrice] = useState({});
  useEffect(() => {
    (async () => {
      const coinInfoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const coinPriceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coiId}`)
      ).json;
      setCoinInfo(coinInfo);
      setCoinPrice(coinPrice);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <CoinTitle>{state?.name || "잘못된 접근입니다."}</CoinTitle>
      </Header>
      {isLoading ? <Loading>"코인을 불러오는중..."</Loading> : null}
    </Container>
  );
}

export default Coin;
