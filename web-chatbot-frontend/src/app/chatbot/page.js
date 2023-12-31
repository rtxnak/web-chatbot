'use client'

import { useState, useEffect } from 'react';
import ChatMessage from '../../components/ChatMessage';
import { useRouter } from 'next/navigation'
import { saveChat } from '../../services/webchatbotAPI'
import Link from 'next/link';


const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const router = useRouter();

  useEffect(() => {
    try {
      const user = localStorage.getItem('username');
      const token = localStorage.getItem('token');
      setIsLoading(false);
      setUser(user);
      setToken(token);
      if (!user || !token) {
        router.push('/login')
        return
      }
    } catch (err) {
      console.log(err)
    }
  }, [user, token, router]);


  const organizeChat = (messages) => {
    let organizedChat = '';

    organizedChat += 'sender, content\n';

    for (const message of messages) {
      if (message.options) {
        organizedChat += `${message.sender}, ${message.content};\n`;
        for (const option of message.options) {
          organizedChat += `, ${option.label}: ${option.value}\n`;
        }
      } else {
        organizedChat += `${message.sender}, ${message.content}\n`;
      }
    }

    return organizedChat;
  }


  const handleMessageSubmit = async (e) => {
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
      ])
      const updatedMessages = [...messages]
      updatedMessages.push({ content: input, sender: user }, { content: `Goodbye! If you have any questions or need assistance in the future, feel free to ask. Have a great day!`, sender: 'bot' })
      const organizedChat = organizeChat(updatedMessages);
      await saveChat(organizedChat, token)
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
        { content: `Sure! It is important to provide precarious and updated information when requesting a loan; Therefore, make sure you have documents to deliver when you register. To start your loan, please access the link: `, sender: 'bot' },
        { content: <a href="https://www.google.com.br/" className="text-blue-500 hover:text-blue-600">{`https://www.google.com.br/`}</a>, sender: 'bot' },
      ]);
    } else if (option === 'conditions') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: 'i want to know loan conditions', sender: user },
        { content: "Interest rates from 1.49% per month and payment in up to 48 months. You can simulate a loan at: ", sender: 'bot' },
        { content: <a href="https://www.google.com.br/" className="text-blue-500 hover:text-blue-600">{`https://www.google.com.br/`}</a>, sender: 'bot' },
      ]);
    } else if (option === 'help') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: 'i want help', sender: user },
        { content: "If you have any questions, you can access the FAQ at the following link: ", sender: 'bot' },
        { content: <a href="https://www.google.com.br/" className="text-blue-500 hover:text-blue-600">{`https://www.google.com.br/`}</a>, sender: 'bot' },
        { content: "if necessary, contact us through the means provided by the website.", sender: 'bot' },
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
        <header className="bg-gradient-to-r from-purple-200 to-purple-300 shadow-sm border flex h-min">
          <div className="max-w-md w-full mx-auto px-4 py-2 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-black text-black">Chatbot</h1>
              <span className="text-gray-600">{`User: ${user?.toUpperCase()}`}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/chat-historic">
                <p className="text-green-500 hover:text-green-600 font-semibold">Chat History</p>
              </Link>
              <a href="#" className="text-blue-500 hover:text-blue-600 font-semibold" onClick={handleLogoff}>
                Logoff
              </a>
            </div>
          </div>
        </header>
        <div className="max-w-md w-full h-full pt-2 pb-12 flex flex-col bg-white rounded-lg shadow-lg overflow-y-auto">
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
