import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPreviewChat } from '../../../../store/slices/chatSlice';
import DialogList from '../DialogList/DialogList';

const DialogListContainer = ({ messagesPreview, userId, getPreviewChat }) => {
  useEffect(() => {
  }, [getPreviewChat]);

  return <DialogList preview={messagesPreview} userId={userId} />;
};

const mapStateToProps = (state) => state.chatStore;

const mapDispatchToProps = {
  getPreviewChat,
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogListContainer);