import React, { useState } from "react";
import { Modal } from "antd";

export default function PrivacyModal() {
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
        Política de Privacidad
      </a>
      <Modal
        title="Política de Privacidad"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Política de Privacidad</p>
        <p>Contenido de la política de privacidad</p>
      </Modal>
    </>
  );
}
