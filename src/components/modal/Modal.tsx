import { openModal, toggleModal } from "@/components/modal/modal-picocss";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

type Children = {
  children: any;
};

const Modal = ({ children }: Children) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      {isModalOpen === false && <Navigate to={"/quizzes"} replace={true} />}
      <dialog id="modal-element" open={isModalOpen}>
        <article style={{ minWidth: "inherit" }}>
          <a aria-label="Close" className="close" data-target="modal-element" onClick={handleModal}></a>
          {children}
          <footer>
            <a role="button" className="secondary" data-target="modal-element" onClick={() => setIsModalOpen(false)}>
              Cancel
            </a>
            <a href="#confirm" role="button" data-target="modal-element" onClick={toggleModal}>
              Confirm
            </a>
          </footer>
        </article>
      </dialog>
    </div>
  );
};

export default Modal;
