import '../assets/styles/components/Overlay.css';

type OverlayArgs = {
  overlayState: boolean;
}

export const Overlay = ({overlayState}: OverlayArgs) => {
  return (
    <div className={`overlay ${overlayState ? 'overlay--active' : ''}`}></div>
  )
}