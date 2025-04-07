import React from "react";
import { Center, H3 } from "./titles";
import { BeerColored, Eye, Handshake, Info, Mouth, Nose } from "./icons";
import { Progress } from "reactstrap";

export const BeerInfoView = ({ title, type, alc, desc }) => {
    return (
        <>
        <Center style={{fontSize:'18px'}}>
            <br/>
            <H3>{title}</H3>
            <br/>
            <p><BeerColored size='30'/> {type}</p>
            <p><Handshake size='30'/> ALC. {alc} % VOL.</p>
            <p><span style={{color:'SpringGreen'}}><Info size='30'/></span> {desc}</p>
        </Center>
        </>
    )
}

export const BeerTasteView = ({ taste }) => {
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    
    return (
        <>
        <Center style={{fontSize:'18px'}}>
            <br/>
            <H3>Taste</H3>
            <br/>
            {Object.keys(taste).map((t, i) => (
                <div style={{marginBottom:'12px'}}>
                <p key={i} style={{marginBottom:'-3px'}}>{capitalizeFirstLetter(t)}</p>
                <Progress striped color="info" value={taste[t]} />
                </div>
            ))}
        </Center>
        </>
    )
}

export const BeerFlavorView = ({ flavor }) => {
    const icons = {
        'visual': <Eye size='30'/>,
        'smell': <Nose size='30'/>,
        'taste': <Mouth size='30'/>
    }

    return (
        <>
        <Center style={{fontSize:'18px'}}>
            <br/>
            <H3>Flavor</H3>
            <br/>
            {Object.keys(flavor).map((f, i) => (
                <div>
                <p key={i}>{icons[f]} {flavor[f]}</p>
                </div>
            ))}
        </Center>
        </>
    )
}

export const FoodInfoView = ({ title, ingredients }) => {
    return (
        <>
        <Center style={{fontSize:'18px'}}>
            <br/>
            <H3>{title}</H3>
            <br/>
            <p><span style={{color:'SpringGreen'}}><Info size='30'/></span> Ingredients: {ingredients}</p>
        </Center>
        </>
    )
}