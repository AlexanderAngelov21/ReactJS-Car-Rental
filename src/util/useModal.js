import { useState } from "react";

export function useModal(showInitialValue) {
  const [show, setShow] = useState(showInitialValue);
  const closeModal = () => setShow(false);
  const openModal = () => setShow(true);
  return [show, closeModal, openModal];
}
