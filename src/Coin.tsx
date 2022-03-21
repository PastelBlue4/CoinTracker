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

interface CoinInfoDataType {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface CoinPriceDataType {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const [isLoading, setIsLoading] = useState(true);
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const [coinInfo, setCoinInfo] = useState<CoinInfoDataType>({});
  const [coinPrice, setCoinPrice] = useState<CoinPriceDataType>({});
  useEffect(() => {
    (async () => {
      const coinInfoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const coinPriceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
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
