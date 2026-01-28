import React, { useState } from "react";
import { Modal } from "antd";

export default function RegulationModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <a
        onClick={showModal}
        className="text-gray-400 hover:text-emerald-400 transition-colors"
      >
        Reglamento
      </a>
      <Modal
        title="Reglamento"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Reglamento</p>
        <p>Contenido del reglamento</p>
      </Modal>
    </>
  );
}
