import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import ChannelCreateForm from '../channel/channel_create_form';
import DirectMessageSearch from '../directMessage/direct_message_search'

const Modal = ({ modal, closeModal, history }) => {

    if (!modal) {
        return null;
    }

    // uses a string variable called modal to determine which comonent to render
    // if info needs to be passed later I can refactor to send a pojo with a type: key
    // and a data: key
    let component;
    switch (modal) {
        case 'createChannel':
            component = <ChannelCreateForm />;
            break;
        case 'directMessageSearch':
            component = <DirectMessageSearch history={history}/>;
            break;
        // case 'userSearch':
        //     component = <UserSearchContainer />;
        //     break;
        default:
            break;
    }

    return (
        <div className="modal-screen" onClick={closeModal}>
            <div className="modal-render" onClick={e => e.stopPropagation()}>
                {component}
            </div>

        </div>
    )

}

const mapStateToProps = state => ({
    modal: state.ui.modal
});

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal)