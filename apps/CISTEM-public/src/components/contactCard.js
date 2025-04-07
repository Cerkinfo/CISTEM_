import React from "react";
import styled from "styled-components";

const Style = styled.div`
.card__comite {
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

  * {
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

    .tools {
      display: flex;
      align-items: center;
      padding: 9px;
      background-color: #011522;
    }

    .circle {
      padding: 0 4px;
    }

    .box {
      display: inline-block;
      align-items: center;
      width: 10px;
      height: 10px;
      padding: 1px;
      border-radius: 50%;
    }

    .red {
      background-color: #ff605c;
    }

    .yellow {
      background-color: #ffbd44;
    }

    .green {
      background-color: #00ca4e;
    }

    .text {
      color: white;
      font-size: 12px;
      font-weight: 600;
      margin-left: auto;
      justify-content: right;
      display: flex;
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
      font-size: 1.5em;
      margin-bottom: 5px;
  }
  
  .details h2 {
      font-weight: 400;
      font-size: 1em;
      margin-bottom: 10px;
      opacity: .6;
  }
  
  .details .desc {
      color: #fff;
      opacity: .8;
      line-height: 1.5;
      margin-bottom: 1em;
  }
  
  .details .cast h3 {
      margin-bottom: .5em;
  }
  
  .details .cast ul {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      gap: 0.625rem;
      width: 100%;
  }
  
  .details .cast ul li {
      list-style: none;
      width: 55px;
      border-radius: 50%;
      overflow: hidden;
  }
  
  .details .cast ul li img {
      width: 100%;
      height: 100%;
  }
}
  `;

export const ContactCard = ({ img, name, nickname, phone }) => {
    return (
        <Style>
        <div className='h-100 card__comite'>
            <div className="wrapper card-item">
            <div className="card">
                <div class="tools">
                    <div class="circle">
                    <span class="red box"></span>
                    </div>
                    <div class="circle">
                    <span class="yellow box"></span>
                    </div>
                    <div class="circle">
                    <span class="green box"></span>
                    </div>
                    <div class="text">
                    FOSDEM Team
                    </div>
                </div>
                <div className="poster">
                    <img src={require(`../assets/img/team_fosdem/${img}`)} alt={name} />
                </div>
                <div style={{'z-index':3}} className="details">
                    <h1>{name} - {nickname}</h1>
                    <h2>{phone}</h2>
                </div>
            </div>
            </div>
        </div>
        </Style>
    )
}
