import React, { useState } from "react";
import Modal from "react-modal";

import {
  useSettings,
  CardSequence,
  CardColor,
  cardColorDescriptions,
  cardSequenceDescriptions,
  IDontKnowCard,
  iDontKnowCardDescriptions,
  TiredCard,
  tiredCardDescriptions,
  Select,
} from "../settings";

import Layout from "../layout";
import IconClose from "../settings/icon-close";
import Card from "../card";

Modal.setAppElement("#___gatsby");

const modalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: "#1a202c",
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
    border: 0,
  },
};

const modalCloseTimeout = 50;

function Settings() {
  const {
    tiredCard,
    setTiredCard,
    iDontKnowCard,
    setIDontKnowCard,
    cardSequence,
    setCardSequence,
    cardColor,
    setCardColor,
    sequenceToArray,
  } = useSettings();

  const [modalOpen, setModalOpen] = useState(true);

  function closeModal() {
    setModalOpen(false);
    setTimeout(() => window.history.back(), modalCloseTimeout);
  }

  return (
    <Layout title="Settings">
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
          <Card size="sm" color={cardColor}>
            144
          </Card>
        </div>

        <Select initialValue={cardColor} onChange={setCardColor}>
          <Select.Label>Color</Select.Label>
          <Select.Body>
            {Object.values(CardColor).map((key) => (
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
            {Object.values(CardSequence).map((key) => (
              <Select.Option value={key} key={key}>
                <div className="p-6">
                  <h4>{cardSequenceDescriptions[key]}</h4>
                  <span>{key}</span>
                </div>
              </Select.Option>
            ))}
          </Select.Body>
        </Select>

        <Select initialValue={iDontKnowCard} onChange={setIDontKnowCard}>
          <Select.Label>I don&apos;t know card</Select.Label>
          <Select.Body>
            {Object.values(IDontKnowCard).map((key) => (
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
            {Object.values(TiredCard).map((key) => (
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
    </Layout>
  );
}

export default Settings;
