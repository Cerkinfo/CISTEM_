import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import styled from "styled-components";
import Separator from "../../components/separator";
import { H3, Text } from "../../components/titles";
import { insert_query } from "./insert_query";

const Style = styled.div`
  .form-group {
    display: flex;
    width: 100%;
    padding: 0 0 0 1rem;
    margin: 1rem 0 1rem 0;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    border-radius: 0.5rem;
    border: 1px solid #e9ecef;
    background-color: #f8f9fa;
  }
  span {
    font-weight: bold;
  }
`;

function InputText({ name, label, placeholder, value, onChange, type }) {
  return (
    <FormGroup>
      <Row className="form-group">
        <Col md="2" className="g-0">{label ? label : name}</Col>
        <Col md="10" className="g-0">
          <Input
            type={type || "text"}
            id={name}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
          />
        </Col>
      </Row>
    </FormGroup>
  );
}

export default function ({ show, close }) {
  const [formData, setFormData] = useState({
    Name: "",
    Type: "",
    Volume: "",
    Alcohol: "",
    Description: "",
    Image: "",
    Bitterness: "",
    Power: "",
    Roundness: "",
    Fruity: "",
    Liveliness: "",
    Acidity: "",
    Visual: "",
    Smell: "",
    Taste: "",
    Price: "",
    BottlesPerCrate: "",
    StockCrates: "",
  });

  const handleInputChange = (name, value, type = "text") => {
    setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);
    const result = await insert_query(formData);
    if (result.success) {
      alert(result.message);
      close();
    } else {
      alert(`Erreur : ${result.message}`);
    }
  };

  return (
    <Modal isOpen={show} size="xl" unmountOnClose={true}>
      <Style>
        <ModalHeader className="flex flex-col gap-1"><H3>Add a new beer</H3></ModalHeader>
        <ModalBody>
          <p>
            Rends-toi sur <a href="https://www.vandb.fr/biere/">vandb.fr</a>, trouve la bière à ajouter et renseigne
            toutes les informations dans le formulaire ci-dessous.
          </p>
          <p>! Attention n'oublie pas de traduire les textes en anglais !</p>
          <Form onSubmit={handleSubmit}>
            <Separator title="General" />
            <InputText name="Name" placeholder="Example : Jupiler" value={formData.Name} onChange={handleInputChange} />
            <InputText
              name="Type"
              placeholder="Example : Blonde Lager"
              value={formData.Type}
              onChange={handleInputChange}
            />
            <InputText
              name="Volume"
              label="Volume (cl)"
              placeholder="Example : 25"
              value={formData.Volume}
              onChange={handleInputChange}
            />
            <InputText
              name="Alcohol"
              label="Alcohol (%)"
              placeholder="Example : 5.2"
              value={formData.Alcohol}
              onChange={handleInputChange}
            />
            <InputText
              name="Description"
              placeholder="Example : Jupiler is a very good beer"
              value={formData.Description}
              onChange={handleInputChange}
            />
            <InputText
              label="Supabase Image Name"
              name="Image"
              placeholder="Example : jupiler.png"
              value={formData.Image}
              onChange={handleInputChange}
            />
            <p style={{ fontSize: "13px", marginLeft: "20px", marginTop: "-10px" }}>
              * Met l'image au préalable dans le Bucket Supabase Storage
            </p>

            <Separator title="Taste" />
            <p style={{ fontSize: "13px" }}>
              Sorry la manip est un peu relou mais sans scraping pas d'autre solution pour l'instant...
            </p>
            <p style={{ fontSize: "13px", marginTop:"-12px" }}>
              Ctrl + U (Code Source) & Ctrl + F (Recherche) & "Description" -&gt; Prendre la valeur "aria-valuenow"
            </p>
            {["Bitterness", "Power", "Roundness", "Fruity", "Liveliness", "Acidity"].map((field) => (
                <InputText
                  key={field}
                  label={`${field} (%)`}
                  name={field}
                  placeholder={`Example : 30`}
                  value={formData[field]}
                  onChange={handleInputChange}
                />
              )
            )}

            <Separator title="Flavors" />
            {["Visual", "Smell", "Taste"].map((field) => (
              <InputText
                key={field}
                name={field}
                placeholder={`Example : Malte, houblon, levure`}
                value={formData[field]}
                onChange={handleInputChange}
              />
            ))}

            <Separator title="Sale" />
            <InputText
              name="Price"
              label="Price (€)"
              placeholder="Example : 2.5"
              value={formData.Price}
              onChange={handleInputChange}
            />
            <InputText
              name="BottlesPerCrate"
              label="Bottles per crate"
              placeholder="Example : 24"
              value={formData.BottlesPerCrate}
              onChange={handleInputChange}
            />
            <InputText
              name="StockCrates"
              label="Stock crates"
              placeholder="Example : 10"
              value={formData.StockCrates}
              onChange={handleInputChange}
            />

          </Form>
        </ModalBody>
        <ModalFooter>
            <p>ATTENTION ! Vérifie bien toutes les réponses car si il n'y a pas de vérification ici mais l'erreur sera provoquée au niveau du serveur et tu devras tout recommencer !</p>
            <Button outline color="danger" onClick={close}>
                Cancel
            </Button>
            <Button outline color="success" onClick={handleSubmit}>
                Add
            </Button>
        </ModalFooter>
      </Style>
    </Modal>
  );
}
