import React, { useEffect, useState } from "react";
import { Container, Spinner } from "reactstrap";
import styled from "styled-components";

const Style = styled.div`
    margin: auto;
    @media {
      width: 95%;
    }
  h3 {
    font-family: "Fjalla One", sans-serif;
    font-weight: 600;
  }
  h5 {
    padding : 0.5rem 0.5rem 0.5rem 1rem;
    background: #353535;
    border-radius: 8px;
    color: white;
    padding: 1rem;
    text-shadow: -10px 5px 10px rgba(0, 0, 0, 0.573);
  }
  em {
    color: #00ca4e;
  }
  strong {
    font-weight: 600;
  }
  li {
    &:before {
      content: "•";
      color: #00ca4e;
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }  
  }
`;

const Content = (props => {
  const [page, setPage] = useState(null);

  useEffect(() => {
    if (props.file) {
      try {
        setPage(require(`../text/json/${props.file}.json`));
      } catch (e) {
        console.error(`Could not find content for ${props.file}.json`);
      }
    }
  });

  if (page) {
    return (
      <>
        <div className="h-100 justify-content">
            <Style>
            <div dangerouslySetInnerHTML={{ __html: page.bodyHtml }}></div>
            </Style>
        </div>
      </>
    );
  } else {
    return (
      <Container className="text-center">
        <Spinner style={{ width: "3rem", height: "3rem" }} />
      </Container>
    );
  }
});

export default Content;