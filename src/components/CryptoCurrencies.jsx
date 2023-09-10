import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input} from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const CryptoCurrencies = ({ simplified }) => {
  const { data: cryptosList, isFetching} = useGetCryptosQuery(simplified ? 12 : 100);
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
        const FilteredData = cryptosList?.data?.coins.filter((coins) => coins.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setCryptos(FilteredData);

  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;
  return (
    <>
      {!simplified && (
              <div className='search-crypto'>
              <Input placeholder='Search CryptoCureency' onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
      )}

      <Row gutter={[32, 32]} className='crypto-card-container'>
          {cryptos?.map((currency) => (
              <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
                  <Link to={`/crypto/${currency.uuid}`}>
                        <Card
                            title={`${currency.rank}. ${currency.name}`}
                            extra={<img className='crypto-image' src={currency.iconUrl} />}
                            hoverable
                        >
                          <p>Price: {millify(currency.price)}</p>
                          <p>Market Cap: {millify(currency.marketCap)}</p>
                          <p>Daily Change: {millify(currency.change)} %</p>
                        </Card>
                  </Link>
              </Col>
          ))}
      </Row>
    </>
  )
}

export default CryptoCurrencies