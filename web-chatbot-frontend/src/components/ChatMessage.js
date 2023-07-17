'use client'

const ChatMessage = ({ message, isUser }) => {
  return (
    <div
      className={`flex ${
        isUser ? 'justify-end' : 'justify-start'
      } mb-4 mx-4`}
    >
      <div
        className={`rounded-lg p-2 ${
          isUser ? 'bg-green-300 text-right' : 'bg-gray-200'
        }`}
      >
        <p className={isUser ? 'text-white' : ''}>{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
