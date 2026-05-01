# Chat UI Components

Simple, clean presentational React components for a ChatGPT-like interface.

## Components

### **Sidebar.jsx**
Left sidebar with chat history placeholder.
```jsx
<Sidebar />
```

### **Message.jsx**
Display individual messages with different styling for user vs AI.
```jsx
<Message message="Hello!" isUser={true} />
<Message message="Hi there!" isUser={false} />
```

### **InputBox.jsx**
Input field for sending messages.
```jsx
<InputBox onSendMessage={(msg) => console.log(msg)} />
```

### **ChatWindow.jsx**
Main chat area that displays messages and input.
```jsx
<ChatWindow 
  messages={[{ text: "Hello", isUser: true }]}
  onSendMessage={(msg) => console.log(msg)}
/>
```

## Styling

All styles are in `styles/` folder as SCSS:
- `_variables.scss` - Colors, spacing, etc.
- `Sidebar.scss` - Sidebar styles
- `Message.scss` - Message bubble styles
- `InputBox.scss` - Input field styles
- `ChatWindow.scss` - Chat window styles
- `Dashboard.scss` - Layout styles

## Usage in Dashboard

The Dashboard.jsx shows how to use the components. You can modify it to add your own state management and logic.

```jsx
const [messages, setMessages] = useState([]);

const handleSendMessage = (message) => {
  // Add your logic here
  setMessages([...messages, { text: message, isUser: true }]);
};

return (
  <div className="dashboard__layout">
    <Sidebar />
    <ChatWindow messages={messages} onSendMessage={handleSendMessage} />
  </div>
);
```

## Features

- Dark theme (ChatGPT style)
- Responsive design (mobile, tablet, desktop)
- Smooth animations
- Auto-scroll to latest message
- Auto-expanding textarea
- Clean, minimal design

