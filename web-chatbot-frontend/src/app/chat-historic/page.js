'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { saveAs } from 'file-saver';
import { getChatHistory } from '../../services/webchatbotAPI';

const ChatHistoric = () => {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const user = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token || !user) {
      router.push('/login');
      return;
    }

    async function fetchChatHistory() {
      try {
        const chatData = await getChatHistory(token);
        setChats([...chatData].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch chat history:', error);
        setIsLoading(false);
      }
    }

    fetchChatHistory();
  }, [router, token]);

  const handleDownloadChat = (chat) => {
    const chatData = chat.chat;
    const chatBlob = new Blob([chatData], { type: 'text/csv;charset=utf-8' });
    saveAs(chatBlob, `chat_${chat.id}.csv`);
  };

  const handleGoBack = () => {
    router.push('/chatbot');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="flex-1 overflow-hidden px-1 pt-2 pb-8 max-w-md w-full">
        <header className="bg-gradient-to-r from-purple-200 to-purple-300 shadow-sm border flex items-center justify-between h-min">
          <div className="max-w-md w-full mx-auto px-4 py-2">
            <h1 className="text-3xl font-black text-black">Chat History</h1>
            <span className="text-gray-600">{`User: ${user.toUpperCase()}`}</span>
          </div>
          <div className="max-w-md w-full mx-auto px-4 py-2 flex justify-end">
            <button
              type="button"
              className="text-blue-500 hover:text-blue-600 font-semibold"
              onClick={handleGoBack}
            >
              Go Back
            </button>
          </div>
        </header>
        <div className="max-w-md w-full h-full flex flex-col py-2 bg-white rounded-lg shadow-lg overflow-y-auto">
          {chats.map((chat, index) => (
            <div key={chat.id} className="flex justify-between items-center px-4 py-2 border-b">
              <div>
                <p className="font-semibold">
                  Conversation {index + 1} - {chat.username}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(chat.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                type="button"
                className="text-blue-500 hover:text-blue-600 font-semibold"
                onClick={() => handleDownloadChat(chat)}
              >
                Download CSV
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatHistoric;
