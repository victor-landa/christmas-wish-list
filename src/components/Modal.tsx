import '../assets/styles/components/Modal.css';

type ModalArgs = {
  form: object;
  modalState: boolean;
}

export const Modal = ({ form, modalState }: any) => {
  return (
    <div className={`modal ${modalState ? 'modal--active' : ''}`}>
      {form}
    </div>
  )
}