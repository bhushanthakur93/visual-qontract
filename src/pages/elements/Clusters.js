import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { chunk } from 'lodash';
import { CardGrid, Row, Col, Card, CardHeading, CardBody, CardFooter, CardTitle } from 'patternfly-react';
import { sortByName } from '../../components/Utils';
import SearchBar from '../../components/SearchBar';

function Clusters({ clusters }) {
  // cardsWidth * cardsPerRow must be <= 12 (bootstrap grid)
  const cardWidth = 4;
  const cardsPerRow = 3;
  const [selected, changeSelected] = useState('Name');
  const [filterText, changeFilterText] = useState('');
  const matchedClusters = [];
  let i;
  for (i = 0; i < clusters.length; i++) {
    if (selected === 'Name') {
      if (clusters[i].name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1) {
        matchedClusters[matchedClusters.length] = clusters[i];
      }
    }
  }
  function handleFilterTextChange(txt) {
    changeFilterText(txt);
  }

  function handleSelect(newSelection) {
    changeSelected(newSelection);
  }

  const rows = chunk(sortByName(matchedClusters), cardsPerRow).map(c => (
    <Row key={c[0].path}>
      {c.map(s => (
        <Col xs={cardWidth} key={s.path}>
          <Card matchHeight accented>
            <CardHeading>
              <CardTitle>{s.name}</CardTitle>
            </CardHeading>
            <CardBody>
              <p>{s.description}</p>
              <p>
                <a href={s.serverUrl}>{s.serverUrl}</a>
              </p>
            </CardBody>
            <CardFooter>
              <p>
                <Link
                  to={{
                    pathname: '/clusters',
                    hash: s.path
                  }}
                >
                  Details
                </Link>
              </p>
            </CardFooter>
          </Card>
        </Col>
      ))}
    </Row>
  ));

  return (
    <div>
      <SearchBar
        filterText={filterText}
        handleFilterTextChange={handleFilterTextChange}
        handleSelect={handleSelect}
        selected={selected}
      />
      <CardGrid matchHeight>{rows}</CardGrid>
    </div>
  );
}

export default Clusters;
