import Modal from './Modal.jsx';
import { Icon } from './Icon.jsx';

/** Full-size view of a certificate or screenshot. Replaces the old site's Bootstrap image modal. */
export default function Lightbox({ open, title, src, alt, onClose }) {
  return (
    <Modal open={open} onClose={onClose} label={title || 'Image'} className="fl-modal--image">
      <div className="fl-modal__bar">
        <p className="fl-modal__eyebrow">{title}</p>
        <button type="button" className="fl-iconbtn fl-iconbtn--ghost" aria-label="Close" onClick={onClose}>
          <Icon name="close" />
        </button>
      </div>
      <img className="fl-modal__img" src={src} alt={alt || title || ''} />
    </Modal>
  );
}
