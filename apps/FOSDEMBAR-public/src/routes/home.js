import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Banner from "../components/banner";
import Navbar from "../components/navbar";
import Separator from "../components/separator";
import { Carousel_ } from "../components/carousel";
import { Double } from "../components/double";
import Content from "../components/content";
import { MenuCard } from "../components/menuCard";
import { Col, Container, Row } from "reactstrap";
import { FolderInfo } from "../components/folder";
import { Beer, Info, ProgressBar } from "../components/icons";
import { BeerFlavorView, BeerInfoView, BeerTasteView, FoodInfoView } from "../components/folderViews";

export default () => {
    const [carouselNews] = useState([
        [<Double img="FOSDEM_beer.png"><Content file={'news_beer'} /></Double>],
        [<Double img="trash_bottles.png"><Content file={'news_trash'} /></Double>]
    ]);

    const beers = require('../assets/data/beers.json').sort((a, b) => a.id - b.id);
    const softs = require('../assets/data/softs.json').sort((a, b) => a.id - b.id);
    const foods = require('../assets/data/foods.json').sort((a, b) => a.id - b.id);

    const coffee = [
        {name: 'Latte', image: require('../assets/img/coffee/latte.jpg'), price: 3.5, price_large: 4.5},
        {name: 'Americano', image: require('../assets/img/coffee/americano.jpg'), price: 3.5, price_large: 4.5},
        {name: 'Double Espresso', image: require('../assets/img/coffee/double-expresso.jpg'), price: 3.5},
        {name: 'Cappuccino', image: require('../assets/img/coffee/cappucino.jpg'), price: 3},
        {name: 'Espresso Macchiato', image: require('../assets/img/coffee/espresso-macchiato.jpg'), price: 2.5},
        {name: 'Cafe Lungo', image: require('../assets/img/coffee/cafe-lungo.png'), price: 2.5},
        {name: 'Espresso', image: require('../assets/img/coffee/espresso.jpg'), price: 2.5},
        {name: 'Chocolat Chaud', image: require('../assets/img/coffee/chocolat-chaud.jpg'), price: 2.5},
        {name: 'The', image: require('../assets/img/coffee/thé.jpg'), price: 2.5},
    ];

    return (
        <>
        <Helmet>
            <title>Bar @ FOSDEM 2025</title>
        </Helmet>
        <Navbar />
        <Banner />
        
        <Separator title="News"/>
        <section className="section section-lg section-shaped pg-250 m-0" id="news">
            <Carousel_ items={carouselNews}/>
        </section>

        <Separator title="Beers"/>
        <section className="section section-lg section-shaped pg-250 m-0" id="beers">
        <Container fluid>
            <Row>
            {beers.map((beer, index) => (
                <Col style={{justifyContent:'center', alignItems:'center', display:'flex'}}>
                <MenuCard key={index} name={beer.name + ' ' + beer.volume + 'cl'} img={beer.image} price={beer.price}/>
                <FolderInfo 
                    tab1={[<Info size='30'/>, <BeerInfoView title={beer.name + ' ' + beer.volume + 'cl'} type={beer.type} alc={beer.alcohol} desc={beer.description}/>]}
                    tab2={[<ProgressBar size='30'/>, <BeerTasteView taste={beer.beers_taste}/>]} 
                    tab3={[<Beer size='30'/>, <BeerFlavorView flavor={beer.beers_flavors}/>]}/>
                </Col>
            ))}
            </Row>
        </Container>
        </section>

        <Separator title="Softs"/>
        <section className="section section-lg section-shaped pg-250 m-0" id="softs">
        <Container fluid>
            <Row>
            {softs.map((soft, index) => (
                <Col lg="3" md="6" sm="12" style={{justifyContent:'center', alignItems:'center', display:'flex'}}>
                <MenuCard key={index} name={soft.name} img={soft.image} price={soft.price}/>
                </Col>
            ))}
            </Row>
        </Container>
        </section>

        <Separator title="Coffee"/>
        <section className="section section-lg section-shaped pg-250 m-0" id="coffee">
        <Container fluid>
            <Row>
            {coffee.map((drink, index) => (
                <Col lg="3" md="6" sm="12" style={{justifyContent:'center', alignItems:'center', display:'flex'}}>
                <MenuCard key={index} name={drink.name} img={drink.image} price={drink.price} price_large={drink.price_large}/>
                </Col>
            ))}
            </Row>
        </Container>
        </section>

        <Separator title="Foods"/>
        <section className="section section-lg section-shaped pg-250 m-0" id="foods">
        <Container fluid>
            <Row>
            {foods.map((food, index) => (
                <Col lg="3" md="6" sm="12" style={{justifyContent:'center', alignItems:'center', display:'flex'}}>
                <MenuCard key={index} name={food.name} img={food.image} price={food.price}/>
                {food.ingredients.length > 0 ? 
                <FolderInfo
                    tab1={[<Info size='30'/>, <FoodInfoView title={food.name} ingredients={food.ingredients}/>]}
                />
                : null }
                </Col>
            ))}
            </Row>
        </Container>
        </section>

        <Separator title="Locations"/>
        <section className="section section-lg section-shaped pg-250 m-0" id="location">
        <Container fluid>
            <Double img="Plan_Solbosch_public.jpg">
                <Content file={'locations'}/>
            </Double>
        </Container>
        </section>
        <br/>
        </>
    )
};