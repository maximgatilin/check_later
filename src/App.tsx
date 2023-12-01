import { useState, } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([
    {id: 0, name: 'Отцы и дети Тургенева', type: 'book'}
  ]);

  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [editorText, setEditorText] = useState('');

  return (
    <div>
      {items.map((i) => (<div style={{ display: 'inline-block', border: '1px solid black', margin: 10, padding: 5 }} key={i.id}>{i.name}</div>))}
      <button onClick={() => {
        setIsEditorVisible(true);
      }}>Добавить</button>
      {isEditorVisible && (
        <div style={{ display: 'inline-block', border: '1px solid black', margin: 10, padding: 5 }}>
          <input type="text" value={editorText} onChange={e => setEditorText(e.target.value)} onKeyUp={(e) => {
              if (e.key === 'Enter') {
                setItems([
                  ...items,
                  {id: items.length + 1, name: editorText, type: 'book'}
                ]);
                setEditorText('');
                setIsEditorVisible(false);
              }
          }} />
        </div>
      )}
    </div>
  );
}

export default App;
