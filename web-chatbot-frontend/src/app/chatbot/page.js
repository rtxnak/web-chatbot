'use client'

import { useState, useEffect } from 'react';
import ChatMessage from '../../components/ChatMessage';
import { useRouter } from 'next/navigation'

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const user = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!user && !token) {
      router.push('/');
    } else {
      setIsLoading(false);
    }
  }, [user, token, router]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    const input = inputValue.trim();

    if (input.toLowerCase() === 'hello') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: input, sender: user },
        { content: 'Hello! How can I assist you?', sender: 'bot' },
      ]);
    } else if (input.toLowerCase() === 'goodbye') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: input, sender: user },
        { content: `Goodbye! If you have any questions or need assistance in the future, feel free to ask. Have a great day!`, sender: 'bot' },
        // Salvar no banco de dados e redirecionar para a página de criação de CSV
      ]);
      console.log(messages);
    } else if (input.toLowerCase() === 'good') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: input, sender: user },
        { content: 'That is great!!', sender: 'bot' },
      ]);
    } else if (input.toLowerCase().includes('i want')) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: input, sender: user },
        { content: `Certainly! Please let me know what you would like assistance with, and I'll do my best to help you.`, sender: 'bot' },
      ]);
    } else if (input.toLowerCase().includes('loan')) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: input, sender: user },
        {
          content: 'Please select an option:',
          sender: 'bot',
          options: [
            { label: 'Do you want to apply for a loan?', value: 'apply' },
            { label: 'Loan conditions', value: 'conditions' },
            { label: 'Help', value: 'help' },
          ],
        },
      ]);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: input, sender: user },
        { content: "I'm sorry, I didn't understand. Can you please rephrase?", sender: 'bot' },
      ]);
    }

    setInputValue('');
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOptionClick = (option) => {
    if (option === 'apply') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: 'i want to apply for a loan', sender: user },
        { content: "mensagens relevantes para a solicitação de empréstimo", sender: 'bot' },
        // mensagens relevantes para a solicitação de empréstimo
      ]);
    } else if (option === 'conditions') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: 'i want to know loan conditions', sender: user },
        { content: "mensagens relevantes para as condições do empréstimo", sender: 'bot' },
        // mensagens relevantes para as condições do empréstimo
      ]);
    } else if (option === 'help') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: 'i want help', sender: user },
        { content: "mensagens relevantes para a ajuda", sender: 'bot' },
        // mensagens relevantes para a ajuda
      ]);
    }
  };

  const handleLogoff = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    router.push('/login')
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
        <header className="bg-white shadow-sm border flex h-1/6 md:h-min">
          <div className="max-w-md w-full mx-auto px-4 py-2 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Chatbot</h1>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">{user.toUpperCase()}</span>
              <a href="#" className="text-blue-500 hover:text-blue-600 font-semibold" onClick={handleLogoff}>
                Logoff
              </a>
            </div>
          </div>
        </header>
        <div className="max-w-md w-full h-full flex flex-col py-2 bg-white rounded-lg shadow-lg overflow-y-auto">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.content}
              isUser={message.sender === user}
            />
          ))}
          {messages.length > 0 && messages[messages.length - 1].options && (
            <div className="flex flex-col items-center mt-4">
              {messages[messages.length - 1].options.map((option, index) => (
                <a
                  key={index}
                  href="#"
                  className="block w-full max-w-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mb-2 focus:outline-none"
                  onClick={() => handleOptionClick(option.value)}
                >
                  {option.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <form className="py-4 px-2 mt-1 bg-white flex max-w-md w-full" onSubmit={handleMessageSubmit}>
        <input
          type="text"
          name="message"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
          placeholder="Type a message..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg ml-2 focus:outline-none"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
