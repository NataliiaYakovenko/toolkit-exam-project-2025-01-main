db.messages.aggregate([
  { $match: { body: /паровоз/i } },
  { $count: 'messagesWithLocomotive' },
]);
