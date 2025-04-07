import React, { useState } from "react";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    FormGroup,
    Input,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

export const ModalNavigate = ({ isOpen, onClose, title, placeholder, list, schedule }) => {
    const navigate = useNavigate();
    const [value, setValue] = useState("");

    const handleSelection = (selected) => {
      setValue(selected);
    };

    const onAction = () => {
        navigate(`/schedule/${schedule}/${encodeURIComponent(value)}`);
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose}>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
                    <FormGroup>
                    <Input type="select">
                        <option value="" disabled selected>{placeholder}</option>
                        {list.map((item, index) => (
                            <option key={index} value={item.label} onClick={() => handleSelection( item.label )}>
                                {item.label}
                            </option>
                        ))}
                    </Input>
                    </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                    Close
                </Button>
                <Button color="primary" onClick={onAction} disabled={value ? false: true}>
                    Go to Schedule
                </Button>
            </ModalFooter>
        </Modal>
    );
};