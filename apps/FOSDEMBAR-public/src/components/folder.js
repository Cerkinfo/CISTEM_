import React, { useState } from "react";
import { Button } from "reactstrap";
import styled from "styled-components";
import { H3 } from "./titles";

const Style = styled.div`
    .tab1 {
        .btn-icon {
            z-index: 0;
            margin-left: -40px;
            top: -195px;
        }
        .btn2-3 {
            top: -90px;
        }
        .collapse {
            background-color: white;
            z-index: 1;
            position: absolute;
            width: 325px;
            height: 450px;
            top: -145px;
            left: -345px;
            border-radius: 18px;
            overflow: hidden;
        }
        .clp2 {
            top: -145px;
        }
        .clp3 {
            top: -200px;
        }
        .icon {
            margin-left: 30px;
            padding: 5px;    
        }
        .icon2 {
            margin-left: 20px;
            padding: 5px;
        }
        .icon3 {
            margin-left: 10px;
            padding: 5px;
        }
    }
`;

const Collapse = ({ isOpen, children, className }) => (
    <div className={className} style={{ opacity: isOpen ? "1" : "0", display:"flex" }}>
        {children}
    </div>
);

export const FolderInfo = ({ tab1, tab2, tab3 }) => {
    const [isTab1, setIsTab1] = useState(false);
    const [isTab2, setIsTab2] = useState(false);
    const [isTab3, setIsTab3] = useState(false);

    const toggleTab1 = () => {
        setIsTab1(!isTab1);
        setIsTab2(false);
        setIsTab3(false);
    };
    const toggleTab2 = () => {
        setIsTab1(false);
        setIsTab2(!isTab2);
        setIsTab3(false);
    }
    const toggleTab3 = () => {
        setIsTab1(false);
        setIsTab2(false);
        setIsTab3(!isTab3);
    }

    return (
        <>
        <Style>
        {tab1 ? (
            <div className="tab1">
            <Button color="info" onClick={toggleTab1} className="btn-icon" 
                style={{
                    marginLeft: isTab2 || isTab3 ? '-100px': null,
                    transition:'.35',
                    marginTop: !tab2 ? '-30px': null
                }}>
                    <div className="icon" style={{color:'MediumBlue'}}>{tab1[0]}</div>
            </Button>
            <div style={{marginTop: '-105px'}}>
            <Collapse isOpen={isTab1} className="collapse">
                <div>
                    {tab1[1]}
                </div>
            </Collapse>
            </div>
            {tab2 ? (
                <div>
                <Button color="warning" onClick={toggleTab2} className="btn-icon btn2-3" 
                    style={{
                        marginLeft: isTab1 || isTab3 ? '-90px': null,
                        transition:'.35'
                    }}>
                        <div className="icon2" style={{color:"Tomato"}}>{tab2[0]}</div>
                </Button>
                <Collapse isOpen={isTab2} className="collapse clp2">
                    {tab2[1]}
                </Collapse>
                {tab3 ? (
                    <div>
                    <Button color="danger" onClick={toggleTab3} className="btn-icon btn2-3" 
                        style={{
                            marginLeft: isTab1 || isTab2 ? '-80px': null,
                            transition:'.35'
                        }}>
                            <div className="icon3" style={{color:"DarkRed"}}>{tab3[0]}</div>
                    </Button>
                    <Collapse isOpen={isTab3} className="collapse clp3">
                        {tab3[1]}
                    </Collapse>
                    </div>
                ) : <div><Button disabled style={{top:'-140px'}}></Button></div>
                }
                </div>
            ) : null
            }
            </div>
        ) : null
        }
        </Style>
        </>
    );
};