import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  getCatalogList,
  removeChatFromCatalog,
} from '../../../../store/slices/chatSlice';
import CatalogList from '../CatalogList/CatalogList';
import DialogList from '../../DialogComponents/DialogList/DialogList';

const CatalogListContainer = ({
  chatStore,
  userStore,
  removeChatFromCatalog,
  getCatalogList,
}) => {
  useEffect(() => {
    getCatalogList();
  }, [getCatalogList]);

  const handleRemoveChat = useCallback(
    (event, chatId) => {
      const { _id } = chatStore.currentCatalog;
      removeChatFromCatalog({ chatId, catalogId: _id });
      event.stopPropagation();
    },
    [chatStore.currentCatalog, removeChatFromCatalog]
  );

  const getDialogsPreview = useCallback(() => {
    const { messagesPreview, currentCatalog } = chatStore;
    const { chats } = currentCatalog;
    return messagesPreview.filter((preview) =>
      chats.some((chat) => chat.id === preview.id)
    );
  }, [chatStore]);

  const { isShowChatsInCatalog } = chatStore;
  const { id } = userStore.data;

  return (
    <>
      {isShowChatsInCatalog ? (
        <DialogList
          userId={id}
          preview={getDialogsPreview()}
          removeChat={handleRemoveChat}
        />
      ) : (
        <CatalogList catalogList={chatStore.catalogList} />
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  chatStore: state.chatStore,
  userStore: state.userStore,
});

const mapDispatchToProps = {
  getCatalogList,
  removeChatFromCatalog,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogListContainer);
