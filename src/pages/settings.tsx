import React, { useState } from "react";
import Modal from "react-modal";

import useCardColor, {
  CardColor,
  cardColorDescriptions
} from "../hooks/useCardColor";
import useCardSequence, {
  CardSequence,
  cardSequenceDescriptions
} from "../hooks/useCardSequence";
import useIDontKnowCard, {
  IDontKnowCard,
  iDontKnowCardDescriptions
} from "../hooks/useIDontKnowCard";
import useTiredCard, {
  TiredCard,
  tiredCardDescriptions
} from "../hooks/useTiredCard";

import IconClose from "../components/icon-close";
import Card from "../components/card";
import Select from "../components/select";

Modal.setAppElement("#___gatsby");

const modalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: "#1a202c"
  },
  content: {
    position: "relative",
    top: "auto",
    bottom: "auto",
    left: "auto",
    right: "auto",
    height: "100%",
    maxHeight: "100vh",
    overflowY: "scroll",
    backgroundColor: "#2D3748",
    padding: 0,
    borderRadius: 0,
    border: 0
  }
};

const modalCloseTimeout = 50;

function Settings() {
  const [color, setColor] = useCardColor();
  const [cardSequence, setCardSequence] = useCardSequence();
  const [iDontKonwCard, setIDontKnowCard] = useIDontKnowCard();
  const [tiredCard, setTiredCard] = useTiredCard();

  const [modalOpen, setModalOpen] = useState(true);

  function closeModal() {
    setModalOpen(false);
    setTimeout(() => window.history.back(), modalCloseTimeout);
  }

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={modalStyles}
      contentLabel="Modal"
      closeTimeoutMS={modalCloseTimeout}
    >
      <div className="flex justify-end items-center absolute top-0 right-0">
        <button onClick={closeModal} className="p-4">
          <IconClose />
        </button>
      </div>
      <div className="flex justify-center my-12">
        <Card size="sm" color={color}>
          144
        </Card>
      </div>

      <Select initialValue={color} onChange={setColor}>
        <Select.Label>Color</Select.Label>
        <Select.Body>
          {Object.values(CardColor).map(key => (
            <Select.Option value={key} key={key}>
              <div className="flex flex-col justify-center items-center px-8 py-6 text-center px-8 py-6">
                <div className={`rounded-lg h-12 w-12 ${key}`} />
                <div className="mt-3">{cardColorDescriptions[key]}</div>
              </div>
            </Select.Option>
          ))}
        </Select.Body>
      </Select>

      <Select initialValue={cardSequence} onChange={setCardSequence}>
        <Select.Label>Card Sequence</Select.Label>
        <Select.Body>
          {Object.values(CardSequence).map(key => (
            <Select.Option value={key} key={key}>
              <div className="p-6">
                <h4>{cardSequenceDescriptions[key]}</h4>
                <span>{key}</span>
              </div>
            </Select.Option>
          ))}
        </Select.Body>
      </Select>

      <Select initialValue={iDontKonwCard} onChange={setIDontKnowCard}>
        <Select.Label>I don&apos;t know card</Select.Label>
        <Select.Body>
          {Object.values(IDontKnowCard).map(key => (
            <Select.Option value={key} key={key}>
              <div className="flex flex-col justify-center items-center px-8 py-6 text-center px-8 py-6">
                <div className="text-4xl">{key}</div>
                <div className="mt-3">{iDontKnowCardDescriptions[key]}</div>
              </div>
            </Select.Option>
          ))}
        </Select.Body>
      </Select>

      <Select initialValue={tiredCard} onChange={setTiredCard}>
        <Select.Label>Tired card</Select.Label>
        <Select.Body>
          {Object.values(TiredCard).map(key => (
            <Select.Option value={key} key={key}>
              <div className="flex flex-col justify-center items-center px-8 py-6 text-center px-8 py-6">
                <div className="text-4xl">{key}</div>
                <div className="mt-3">{tiredCardDescriptions[key]}</div>
              </div>
            </Select.Option>
          ))}
        </Select.Body>
      </Select>
    </Modal>
  );
}

export default Settings;
