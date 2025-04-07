import React from "react";
import styled from "styled-components";

const Style = styled.div`
.card__comite {
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

  * {
      z-index: 1;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: Inter, sans-serif;
  }
  
  body {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
  }
  
  .wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 20px;
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
  }
  
  .card {
      position: relative;
      width: 325px;
      height: 450px;
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
  }
  
  .poster {
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
  }
  
  .poster::before {
      content: '';
      position: absolute;
      bottom: -45%;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      transition: .3s;
  }
  
  .poster img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: .3s;
  }
  
  .details {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: auto;
      padding: .8em 1.5em .8em;
      background: #000a;
      backdrop-filter: blur(16px) saturate(120%);
      transition: .3s;
      color: #fff;
      z-index: 2;
  }
  
  .details h1,
  .details h2 {
      font-weight: 700;
  }
  
  .details h1 {
      font-size: 110%;
      margin-bottom: 5px;
      display: inline-flex;
      overflow: hidden;
  }
  
  .details h2 {
      font-weight: 400;
      font-size: 1em;
      margin-bottom: 10px;
      opacity: .6;
  }

    .price {
        position: absolute;
        top: 0;
        right: 0;
        width: 30%;
        height: auto;
        padding: 0.5rem;
        margin: 0.5rem;
        background: LightGreen;
        backdrop-filter: blur(16px) saturate(120%);
        color: #000a;
        border-radius: 25px;
        text-align: center;
    }
}
  `;

export const MenuCard = ({ img, name, description, price, price_large }) => {
    return (
        <Style>
        <div className='h-100 card__comite'>
            <div className="wrapper card-item">
            <div className="card">
                <div className="poster">
                    <img src={img} alt={name} />
                </div>
                <div style={{'z-index':3}} className="details">
                    <h1>{name}</h1>
                    <h2>{description}</h2>
                </div>
                <div style={{'z-index':4}} className="price">
                    <h5>€ {price.toFixed(2).toString()}</h5>
                    {price_large ? <h6>L € {price_large.toFixed(2).toString()}</h6> : null}
                </div>
            </div>
            </div>
        </div>
        </Style>
    )
}
