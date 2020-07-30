import React  from 'react';
import { Button, Row, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import * as Constants from '../common/constants';

const DeleteModal = (props) => {

  return (
    <Modal isOpen={props.isOpen} 
              toggle={props.handleDeleteUserAlert}
              centered
              backdrop='static'                             
              className={'modal-danger '}
              >
          <ModalHeader toggle={props.handleDeleteUserAlert} style={{direction:"inherit"}}>
                 <span hidden={props.isOnlyOneUserSelected} >{Constants.DELETE_USERS_TITLE}</span> 
                  <span hidden={!props.isOnlyOneUserSelected}>{Constants.DELETE_USER_TITLE}</span> 
            </ModalHeader>
              <ModalBody>
                <Row className="p-3" style={{fontWeight:"bold",fontSize:"18px"}}>
                  <span hidden={props.isOnlyOneUserSelected} >{Constants.ARE_YOU_SURE_YOU_WANT_TO_DELETE_THOS_USERS}</span> 
                  <span hidden={!props.isOnlyOneUserSelected}>{Constants.ARE_YOU_SURE_YOU_WANT_TO_DELETE_THE_USER}</span> 
                </Row>                                
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" className="ml-1 mr-1 modal-footer-action-button" onClick={props.handleDeleteUserAlert}>{Constants.CANCEL_BUTTON_TITLE}</Button>
                <Button color="danger" className="ml-1 mr-1 modal-footer-action-button" onClick={ () =>props.handleDeleteUsersAction()}>{Constants.CONFIRM_BUTTON_TITLE}</Button>
              </ModalFooter>                              
      </Modal>
  );
}
export default DeleteModal;