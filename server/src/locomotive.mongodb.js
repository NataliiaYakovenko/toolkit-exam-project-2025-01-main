db.messages.aggregate([
  { $match: { body: /locomotive/i } },
  { $count: 'messagesWithLocomotive' },
]);
