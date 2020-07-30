import React, { Fragment , Component} from 'react';
import * as Constants from '../common/constants';
import { Button, Row, Col, Modal, ModalBody, ModalHeader } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import cellEditFactory from 'react-bootstrap-table2-editor'
import userService from '../services/users.service'
import usersService from '../services/users.service';
import AddUser from './AddUser'
import { Utils } from '../common/utils';
import DeleteModal from './DeleteModal';
const { SearchBar } = Search;

export default class UsersTable extends Component {

    constructor(props) {
        super(props);
          this.state = {
            isLoading: true,
            selected: [],
            tableData: undefined,
            isOpenAddUserModal: false,
            isOpenDeleteUserAlertModal: false
        };
    }  

    handleOnSelect = (row, isSelect) => {
        if (isSelect) {
            if(!Utils.isAdministrator(row.role.id)){
                this.setState(() => ({
                  selected: [...this.state.selected, row._id]
                }));
            }else{
                return false
            }
        } else {
          this.setState(() => ({
            selected: this.state.selected.filter(x => x !== row._id)
          }));
        }
    }
    
    handleOnSelectAll = (isSelect, rows) => {
        const usersWithoutAdmins = rows.filter(user => {
            if(!Utils.isAdministrator(user.role.id)){return user;}
            return undefined;
        })
        const ids = usersWithoutAdmins.map(r => r._id);
        if (isSelect) {
          this.setState(() => ({
            selected: ids
          }));
        } else {
          this.setState(() => ({
            selected: []
          }));
        }
    }

    componentDidMount(){
        userService.get().then(result=>{
            this.setState({ 
                isLoading: false,
                tableData: result
            })
        }).catch(error=>{
            console.log(error)
        })
    }

    handleOpenAddUserModal= ()=>{
        this.setState(prevState=>({
            isOpenAddUserModal: !prevState.isOpenAddUserModal,
        }))
    }
    
    handleSaveNewUser = (savedNewUser)=>{
        this.setState(prevState=>({
            isOpenAddUserModal: !prevState.isOpenAddUserModal,
            tableData: {...prevState.tableData, data: [...prevState.tableData.data, savedNewUser ]}
        }))
    }

    addUserModal = () =>{
        return (
            <Col col="4" sm="4" md="2"  className="mt-3 mb-3 mb-xl-0">
                <Button color="info" onClick={this.handleOpenAddUserModal}>{Constants.ADD_USER_TITLE}</Button>
                <Modal isOpen={this.state.isOpenAddUserModal} toggle={this.handleOpenAddUserModal} >
                    <ModalHeader toggle={this.handleOpenAddUserModal}>{Constants.ADD_USER_TITLE}</ModalHeader>
                    <ModalBody>
                        <AddUser handleSaveNewUser={this.handleSaveNewUser} roles={this.props.roles}></AddUser>
                    </ModalBody>
                </Modal>
            </Col>
        )
    }

    DrawDeleteUserModal = () =>{
        const { selected, isOpenDeleteUserAlertModal} = this.state;
        const isAnyUserSelected = selected.length > 0;
        const isOnlyOneUserSelected = selected.length === 1;
        return (
            <Fragment>
                <Col hidden={!isAnyUserSelected} col="4" sm="4" md="2"  className="mt-3 mb-3 mb-xl-0">
                    <Button block color="danger"  onClick={this.handleDeleteUserAlert}>{Constants.DELETE_BUTTON_TITLE}</Button>
                    <DeleteModal
                        isOpen = {isOpenDeleteUserAlertModal}
                        isAnyUserSelected={isAnyUserSelected}
                        isOnlyOneUserSelected = {isOnlyOneUserSelected}
                        handleDeleteUserAlert={this.handleDeleteUserAlert}
                        handleDeleteUsersAction={this.handleDeleteUsersAction}
                        ></DeleteModal>
                </Col>
            </Fragment>
        )
    }
      
    handleDeleteUserAlert =() => {
        this.setState(prevState=>({
            isOpenDeleteUserAlertModal: !prevState.isOpenDeleteUserAlertModal,
        }));
    }
  
    handleDeleteUsersAction = async () =>{
       let selectedUsers = this.state.selected
        if(selectedUsers.length === this.state.tableData.data.length){
            await userService.deleteAllUsers();
        } else {
            await userService.deleteUsers(selectedUsers);
        }
        Utils.getToastSuccess(Constants.USERS_DELETED_SUCCESSFULLY_TOAST_TITLE);
        let updatedUsers = this.state.tableData.data;
        updatedUsers = updatedUsers.filter(user => !selectedUsers.find(removeUserId => (removeUserId === user._id) ))
        this.setState(prevState =>({
            isOpenDeleteUserAlertModal: !prevState.isOpenDeleteUserAlertModal,
            tableData: {...prevState.tableData, data: updatedUsers}
        }));
    }
    
    cellUpdated = (oldValue, newValue, row, column) =>{
        if(oldValue !== newValue){
            var updateUser = {}
            updateUser["_id"] = row._id;
            updateUser[column.dataField] = newValue;
            this.setState({
                isLoading: true
            }, async ()=>{
                await usersService.update(updateUser);
                this.setState({ isLoading:false})
            })
        }
    }

    getSelectedRowCallback  = (isAdministrator) =>{
        if(isAdministrator){
            return { mode: 'checkbox',
                    clickToSelect: false,
                    selected: this.state.selected,
                    onSelect: this.handleOnSelect,
                    onSelectAll: this.handleOnSelectAll
            }
        }
        return undefined
    } 

    getCellEditCallback = (isAdministrator)=>{
        if(isAdministrator){
            return cellEditFactory({ mode: 'click', 
                                    blurToSave: true,
                                    afterSaveCell: this.cellUpdated 
                                    })
        }
        return undefined
    }

    drawTable(){
        const { tableData } = this.state;
        const { permission } = this.props;
        const isAdministrator = Utils.isAdministrator(permission);
        return (
            <Fragment>
                <ToolkitProvider
                    keyField={tableData.keyFieldID}
                    data={ tableData.data }
                    columns={ tableData.columns }
                    search          
                >
                    {
                    props => (
                        <div className="mt-3">
                            <SearchBar className="pray-search-bar" placeholder={Constants.SEARCH_USER_PLACEHOLDER}  { ...props.searchProps } />
                            { isAdministrator && 
                                <Row className="align-items-center">
                                    { this.addUserModal() }
                                    { this.DrawDeleteUserModal() }
                                </Row>
                            }
                            <hr />
                            <BootstrapTable
                            headerClasses="header-class-search-edit-table"
                            striped
                            hover 
                            condensed
                            selectRow ={ this.getSelectedRowCallback(isAdministrator) }
                            cellEdit={ this.getCellEditCallback(isAdministrator) }
                            { ...props.baseProps }
                            />
                        
                        </div>
                    )
                    }
                </ToolkitProvider>
        </Fragment>        
        )
    }

    drawNoAuthrizedUser(){
        return (
            <div className="not-authrized">
                <h2>
                    {Constants.NOT_AUTHRIZED_USER_TITLE}
                </h2>
            </div>
        )
    }

    render(){
        const { permission } = this.props;
        const { isLoading } = this.state;
        const isNotAuthrizedUser = Utils.isNotAuthrizedUser(permission);
        return(
            <Fragment>
                {  isLoading && Utils.drawSpinner()}
                { !isLoading && isNotAuthrizedUser && this.drawNoAuthrizedUser()}
                { !isLoading && !isNotAuthrizedUser && this.state.tableData && this.drawTable() }
            </Fragment>
        )
    }

}