import React, { useState } from "react";
import Banner from "../components/banner";
import { Helmet } from "react-helmet";
import Separator from "../components/separator";
import { Center, H3, Text } from "../components/titles";
import Content from "../components/content";
import { Window } from "../components/window";
import { Beer, Book, Calendar, Chief, LocationPoint, Mail, Pack, Peoples, Person, Sumup, Talkie, VLC_Cone } from "../components/icons";
import { Double } from "../components/double";
import { ContactCard } from "../components/contactCard";
import { AccordionBody, AccordionHeader, AccordionItem, Alert, Badge, Col, Container, Row, UncontrolledAccordion } from "reactstrap";
import { Carousel_ } from "../components/carousel";
import { Button_ } from "../components/button";
import { useNavigate } from "react-router-dom";
import { ModalNavigate } from "../components/modal";
import { LocalUser } from "../components/user";
import transformedVolunteers from "../utils/volunteers";
import transformedBars from "../utils/bars";
import { WhatsappButton } from "../components/whatsapp";
import { Alert_ } from "../components/alert";

export default () => {
    const navigate = useNavigate();
    const isSmallScreen = window.innerWidth < 768;
    const fosdem = require('../assets/data/contacts.json')['fosdem'];
    const team = require('../assets/data/contacts.json')['team'];
    const carousel_contacts = [];
    const carousel_managers = [];

    const [isVolunteersOpen, setIsVolunteersOpen] = useState(false);
    const [isBarsOpen, setIsBarsOpen] = useState(false);

    const handleGlobalSchedule = () => {
        navigate('/schedule/global');
    };

    const handleOpenModal = ({ type }) => {
        if (type === 'personal') setIsVolunteersOpen(true);
        if (type === 'bars') setIsBarsOpen(true);
    };

    return (
        <>
        <Helmet>
            <title>CISTEM - Home</title>
        </Helmet>
        <Banner />
        <section className="section section-lg section-shaped pg-250 m-0">
        <Window title={'Hello World!'}>
            <Content file={'intro'} />
        </Window>
        </section>
        <Separator title={'The FOSDEM Manual'} />
        <section className="section section-lg section-shaped m-0">
        <Center>
            <Alert_ color="info"
                title="Un seul mot d'ordre : COMMUNIQUEZ !"
                description="Soyez concis et clairs, mais n'hésitez pas à demander des choses, à distribuer une information importante. Soyez respectueux les uns par rapport au autres, surtout devant les clients (on est pas aux TD’s)."
            />
            <br/>
            <UncontrolledAccordion>
                <AccordionItem>
                    <AccordionHeader targetId="1">
                        <div>
                            <H3><LocationPoint size="30"/>Localisation</H3>
                            <Text style={{marginLeft:"3rem", opacity:"0.7"}}>Plan et explications des divers points de ventes Cerkinfo et prestataires</Text>
                        </div>
                    </AccordionHeader>
                    <AccordionBody accordionId="1">
                        <Double img={'fosdem_plan_solbosch.jpg'} id={'fosdem'}>
                            <div style={{paddingLeft: "3rem"}}><Content file={'location'} /></div>
                        </Double>
                    </AccordionBody>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeader targetId="2">
                        <div>
                            <H3><VLC_Cone size="30"/>Préparation & Cloture</H3>
                            <Text style={{marginLeft:"3rem", opacity:"0.7"}}>Explications et horaires sur le montage et démontage</Text>
                        </div>
                    </AccordionHeader>
                    <AccordionBody accordionId="2">
                        <Content file={'montage'} />
                    </AccordionBody>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeader targetId="3">
                        <div>
                            <H3><Peoples size="30"/>Les jobs</H3>
                            <Text style={{marginLeft:"3rem", opacity:"0.7"}}>Explications de chaque postes, et informations utiles pour ces derniers</Text>
                        </div>
                    </AccordionHeader>
                    <AccordionBody accordionId="3">
                        <Content file={'jobs'} />
                    </AccordionBody>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeader targetId="4">
                        <div>
                            <H3><Book size="30"/>Guide du bon FOSDEM</H3>
                            <Text style={{marginLeft:"3rem", opacity:"0.7"}}>Les tips et astuces pour que vous passiez un bon FOSDEM et que tout se déroule au mieux</Text>
                        </div>
                    </AccordionHeader>
                    <AccordionBody accordionId="4">
                        <Content file={'guide'} />
                    </AccordionBody>
                </AccordionItem>
            </UncontrolledAccordion>
        </Center>
        </section>
        <Separator title={'Perms'} />
        <section className="section section-lg section-shaped pg-250 m-0">
        <Center>
        <Alert_ color="warning"
                title="Soyez à l'heure svp ! On compte sur vous ! Et prévenez nous si vous avez un contre temps."
                description={<span>Vendredi : 08H00<br/>Samedi : 08H00<br/>Dimanche : 08H00<br/>Lundi : 09H00<br/>Rendez-vous aux prefabs (ou directement à votre poste si vous êtes en retard)</span>}
            />
            <br/>
            <UncontrolledAccordion>
                <AccordionItem>
                    <AccordionHeader targetId="1">
                        <div>
                            <H3><Chief size="30"/>Managers</H3>
                            <Text style={{marginLeft:"3rem", opacity:"0.7"}}>Personnes de référence pour votre job en fonction de là où vous êtes</Text>
                        </div>
                    </AccordionHeader>
                    <AccordionBody accordionId="1">
                        {isSmallScreen ? (
                        <>
                            {Object.keys(team).map((point) => {
                                {carousel_managers.push([
                                <div key={point} className="d-flex flex-column align-items-center g-0">
                                    <H3>{team[point].location}</H3>
                                    {Object.keys(team[point].managers).map((role) => {
                                        const person = team[point].managers[role];
                                        return (
                                            <div key={role} className={role === 'manager' ? 'manager-class' : 'suppleant-class'}>
                                                <LocalUser name={person.name} description={`${person.phone}\n${role === 'manager' ? 'Manager' : 'Suppleant'}`} />
                                            </div>
                                        );
                                    })}
                                </div>
                                ])}
                            })}
                            <Carousel_ items={carousel_managers} />
                        </>
                        ) : (
                        <Row>
                            {Object.keys(team).map((point) => (
                                <Col key={point} className="d-flex flex-column align-items-center g-0">
                                    <H3>{team[point].location}</H3>
                                    {Object.keys(team[point].managers).map((role) => {
                                        const person = team[point].managers[role];
                                        return (
                                            <div key={role} className={role === 'manager' ? 'manager-class' : 'suppleant-class'}>
                                                <LocalUser name={person.name} description={`${person.phone}\n${role === 'manager' ? 'Manager' : 'Suppleant'}`} />
                                            </div>
                                        );
                                    })}
                                </Col>
                            ))}
                        </Row>
                        )}
                        <br/>
                        <p style={{fontSize: "10px"}}>* Le/la manager suppléant.e est le/la remplaçante du manager (SURTOUT pour le talkie-walkie) en cas d'absence ou une assitance dans l'organisation des lieux en cas de forte affluence. Ainsi, comme le/la manager, iel ne changera pas de poste pendant le week-end.</p>
                    </AccordionBody>
                </AccordionItem>
            </UncontrolledAccordion>
            <br/>
            <Container style={{padding:'2rem 0 0 0'}}><Row className="justify-content-center align-items-center">
                <Col className="d-flex justify-content-center mb-4"><Button_ icon={<Calendar/>} onClick={handleGlobalSchedule}>Planning Global</Button_></Col>
                <Col className="d-flex justify-content-center mb-4"><Button_ icon={<Person/>} onClick={() => handleOpenModal({ type: 'personal' })}>Ton Planning</Button_></Col>
                <Col className="d-flex justify-content-center mb-4"><Button_ icon={<Beer/>} onClick={() => handleOpenModal({ type: 'bars' })}>Planning / Lieu</Button_></Col>
            </Row></Container>
        </Center>
        </section>
        <Separator title={'Tools'} />
        <section className="section section-lg section-shaped pg-250 m-0">
        <div className="d-flex justify-content-center align-items-center">
            <WhatsappButton />
        </div>
        <Center>
            <UncontrolledAccordion>
                <AccordionItem>
                    <AccordionHeader targetId="1">
                        <div>
                            <H3><Sumup size="30"/>Sumup</H3>
                            <Text style={{marginLeft:"3rem", opacity:"0.7"}}>Application à installer sur votre téléphone pour pouvoir faire payer le client avec la carte bancaire</Text>
                        </div>
                    </AccordionHeader>
                    <AccordionBody accordionId="1">
                        <Double img={'sumup.gif'} id={'sumup'}>
                            <Content file={'sumup'} />
                        </Double>
                    </AccordionBody>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeader targetId="2">
                        <div>
                            <H3><Pack size="30"/>CISTEM <h6><Badge color="primary">New</Badge></h6></H3>
                            <Text style={{marginLeft:"3rem", opacity:"0.7"}}>Application uniquement à destination des <u>managers et Team FOSDEM</u></Text>
                        </div>
                    </AccordionHeader>
                    <AccordionBody accordionId="2">
                        <Double img={'fosdem_ci_purple.png'} id={'cistem'} width={'50%'}>
                            <Content file={'cistem'} />
                        </Double>
                    </AccordionBody>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeader targetId="3">
                        <div>
                            <H3><Talkie size="30"/>Talkie-Walkie</H3>
                            <Text style={{marginLeft:"3rem", opacity:"0.7"}}>Outil uniquement à destination des <u>managers et Team FOSDEM</u></Text>
                        </div>
                    </AccordionHeader>
                    <AccordionBody accordionId="3">
                        <Double img={'talkie.jpg'} id={'talkie'}>
                            <Content file={'talkie'} />
                        </Double>
                    </AccordionBody>
                </AccordionItem>
            </UncontrolledAccordion>
        </Center>
        </section>
        <Separator title={'Contact'} />
        <section className="section section-lg section-shaped pg-250 m-0">
        <div className="d-flex justify-content-center align-items-center">
            <div style={{ width: '20rem' }}>
                <Alert style={{verticalAlign:'middle'}}>
                    <H3><Mail size="40"/>fosdem@cerkinfo.be</H3>
                </Alert>
            </div>
        </div>
        <Center>
            <div className="justify-content-center align-items-center">
            {isSmallScreen ? (
            <>
                {fosdem.map((contact) => {
                    carousel_contacts.push([
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                        <ContactCard img={contact.img} name={contact.name} nickname={contact.nickname} phone={contact.phone} />
                        </div>
                    ]);
                    return null;
                })}
                <Carousel_ items={carousel_contacts} />
            </>
            ) : ( 
                <Row>
                    {fosdem.map((contact) => (
                        <Col className="d-flex justify-content-center mb-4" xs="12" sm="6" md="4">
                            <ContactCard img={contact.img} name={contact.name} nickname={contact.nickname} phone={contact.phone} />
                        </Col>
                    ))}
                </Row>
            )}
            </div>
        </Center>
        </section>
        <ModalNavigate
            isOpen={isVolunteersOpen}
            onClose={() => setIsVolunteersOpen(false)}
            title="Qui es-tu ?"
            placeholder="Sélectionne ton nom"
            list={transformedVolunteers}
            schedule={'personal'}
        />
        <ModalNavigate
            isOpen={isBarsOpen}
            onClose={() => setIsBarsOpen(false)}
            title="Quel endroit souhaites-tu voir ?"
            placeholder="Sélectionne une localisation"
            list={transformedBars}
            schedule={'bar'}
        />
        </>
    )
};