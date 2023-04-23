import { useEffect } from "react";
import { isScrollbarVisible, toggleModal } from "../modal/modal-picocss.js";

type Children = {
  children: React.ReactNode;
};

const Modal = ({ children }: Children) => {
  useEffect(() => {
    console.log(isScrollbarVisible());
  }, []);

  return (
    <div>
      <button className="contrast" data-target="modal-example" onClick={toggleModal}>
        Launch demo modal
      </button>

      <dialog id="modal-example">
        <article>
          <a href="#close" aria-label="Close" className="close" data-target="modal-example" onClick={toggleModal}></a>
          {children}
          <footer>
            <a href="#cancel" role="button" className="secondary" data-target="modal-example" onClick={toggleModal}>
              Cancel
            </a>
            <a href="#confirm" role="button" data-target="modal-example" onClick={toggleModal}>
              Confirm
            </a>
          </footer>
        </article>
      </dialog>
    </div>
  );
};

export default Modal;
