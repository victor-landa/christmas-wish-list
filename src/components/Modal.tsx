import '../assets/styles/components/Modal.css';

type ModalArgs = {
  content: object;
  modalState: boolean;
}

export const Modal = ({ content, modalState }: ModalArgs) => {
  return (
    <div className={`modal ${modalState ? 'modal--active' : ''}`}>
      {content}
    </div>
  )
}