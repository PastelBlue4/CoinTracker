import { useEffect, useState } from "react";
import { useParams, useLocation, Routes, Route } from "react-router";
import styled from "styled-components";
import CoinPrice from "./CoinPrice";
import CoinChart from "./CoinChart";

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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const Overviewitem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

interface LocationState {
  state: {
    name: string;
    rank: number;
  };
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
  const { coinId } = useParams() as any;
  const { state } = useLocation() as LocationState;
  const [coinInfo, setCoinInfo] = useState<CoinInfoDataType>();
  const [coinPrice, setCoinPrice] = useState<CoinPriceDataType>();
  useEffect(() => {
    (async () => {
      const coinInfoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const coinPriceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setCoinInfo(coinInfoData);
      setCoinPrice(coinPriceData);
      setIsLoading(false);
    })();
  }, [coinId]);
  return (
    <Container>
      <Header>
        <CoinTitle>
          {state?.name
            ? state.name
            : isLoading
            ? "코인정보 로딩중..."
            : coinInfo?.name}
        </CoinTitle>
      </Header>

      {isLoading ? (
        <Loading>로딩중...</Loading>
      ) : (
        <>
          <Overview>
            <Overviewitem>
              <span>Rank:</span>
              <span>{coinInfo?.rank}</span>
            </Overviewitem>
            <Overviewitem>
              <span>SYMBOL:</span>
              <span>{coinInfo?.symbol}</span>
            </Overviewitem>
            <Overviewitem>
              <span>OPEN SOUCE: yes: no</span>
              <span>{coinInfo?.open_source}</span>
            </Overviewitem>
          </Overview>
          <Description>{coinInfo?.description}</Description>
          <Overview>
            <Overviewitem>
              <span>Total Suply:</span>
              <span>{coinPrice?.total_supply}</span>
            </Overviewitem>
            <Overviewitem>
              <span>Max Supply:</span>
              <span>{coinPrice?.max_supply}</span>
            </Overviewitem>
          </Overview>
          <Routes>
            <Route path={`/${coinId}/price`}>
              <CoinPrice />
            </Route>
            <Route path={`/${coinId}/chart`}>
              <CoinChart />
            </Route>
          </Routes>
        </>
      )}
    </Container>
  );
}

export default Coin;
