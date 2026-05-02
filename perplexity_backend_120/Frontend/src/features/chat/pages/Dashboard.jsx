import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import '../styles/Chat.scss'
import { initializeSocketconnection } from '../service/chat.socket'



const Dashboard = () => {
  const chat = useChat()
  const [ chatInput, setChatInput ] = useState('')
  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)

  useEffect(() => {
    initializeSocketconnection()
  }, [])

  const handleSubmitMessage = (event) => {
    event.preventDefault()

    const trimmedMessage = chatInput.trim()
    if (!trimmedMessage) {
      return
    }

    chat.handleSendMessage(trimmedMessage, currentChatId)
    setChatInput('')
  }

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId)
  }

  return (
    <main className='dashboard-main'>
      <section className='dashboard-section'>
        <aside className='sidebar'>
          <h1 className='sidebar-title'>Perplexity</h1>

          <div className='chats-list'>
            {Object.values(chats).map((chat,index) => (
              <button
                onClick={()=>{openChat(chat.id)}}
                key={index}
                type='button'
                className='chat-item'
              >
                {chat.title}
              </button>
            ))}
          </div>
        </aside>

        <section className='dashboard-content-section'>

          <div className='messages'>
            {chats[ currentChatId ]?.messages.map((message) => (
              <div
                key={message.id}
                className={`message-wrapper ${message.role === 'user'
                    ? 'user-message'
                    : 'ai-message'
                  }`}
              >
                {message.role === 'user' ? (
                  <p>{message.content}</p>
                ) : (
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className='mb-2 last:mb-0'>{children}</p>,
                      ul: ({ children }) => <ul className='mb-2 list-disc pl-5'>{children}</ul>,
                      ol: ({ children }) => <ol className='mb-2 list-decimal pl-5'>{children}</ol>,
                      code: ({ children }) => <code className='rounded bg-white/10 px-1 py-0.5'>{children}</code>,
                      pre: ({ children }) => <pre className='mb-2 overflow-x-auto rounded-xl bg-black/30 p-3'>{children}</pre>
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                )}
              </div>
            ))}
          </div>

          <footer className='dashboard-footer'>
            <form onSubmit={handleSubmitMessage} className='dashboard-form'>
              <input
                type='text'
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder='Type your message...'
                className='dashboard-input'
              />
              <button
                type='submit'
                disabled={!chatInput.trim()}
                className='dashboard-submit-btn'
              >
                Send
              </button>
            </form>
          </footer>
        </section>
      </section>
    </main>
  )
}

export default Dashboard
