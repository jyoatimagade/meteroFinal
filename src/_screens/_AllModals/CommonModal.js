import { Modal } from "react-bootstrap";
import { notesIcon, closeIcon, loginError } from "../../_config/images";

const CommonModal = (props) => {
    return (
      <Modal
              show={props.showModal}
              onHide={props.onHide}
              className="notesModal "
            >
              <Modal.Header className="d-flex justify-content-end">
                <a
                  className="position-absolute modal-close"
                  onClick={props.hideModal}
                >
                  <img src={closeIcon} />
                </a>
              </Modal.Header>
              <Modal.Body className="text-center">
                {
                  props.icon 
                  ? <img src={props.icon} className="img-fluid py-2 d-inline-block text-center"  /> 
                  : ''
                }
              <img src={props.loginError}/>
                {props.children}
              </Modal.Body>
              {
                props.showFooterActions ? (
              <Modal.Footer>
                <div className="d-flex justify-content-start text-center">
                  {
                    props.showActionButton ? 
                    <button onClick={props.buttonAction} type="submit" className="btn btn-primary mx-1">
                      {props.buttonText}
                    </button>
                  : null
                  }
                  {
                    props.showCancelButton ? 
                    <button onClick={props.hideModal} type="submit" className="btn btn-cancel mx-1">
                      {props.cancelButtonText}
                    </button>
                  : null
                }
                </div>
              </Modal.Footer>
              ) :null 
            }
            </Modal>
    )
  }

  export default CommonModal