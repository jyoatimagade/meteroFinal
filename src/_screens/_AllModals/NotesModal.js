import React, {useState} from "react";
import { Modal } from "react-bootstrap";
const NotesModal = () => {
  const [notesModal, setnotesModal] = useState(false);
  const _addNotesModalShow = () => {
    setnotesModal(true);
  };
  const _addNotesModalHide = () => {
    setnotesModal(false);
  };
  
  return (
    <>
    <Modal show={notesModal} onHide={_addNotesModalHide}>
<Modal.Header closeButton>
  <Modal.Title>Notes Nodal</Modal.Title>
</Modal.Header>
<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
<Modal.Footer>
  {/* <Button className="btn secondary" onClick={_addNotesModalHide}>
    Close
  </Button>
  <Button className="primary" onClick={_addNotesModalHide}>
    Save Changes
  </Button> */}
</Modal.Footer>
</Modal>
    </>
  );
};

export default NotesModal;

