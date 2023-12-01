import { useState, useMemo } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([
    {id: guid(), name: 'Отцы и дети Тургенева', action_type: 'read'},
    {id: guid(), name: 'Терминатор 2', action_type: 'watch'}
  ]);

  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [editorText, setEditorText] = useState('');
  const [selectedTab, setSelectedTab] = useState('watch');
  const itemsFiltered = useMemo(() => {
    return items.filter((i) => i.action_type === selectedTab);
  }, [items, selectedTab]);

  const tabs = [
    { label: 'Посмотреть', value: 'watch' },
    { label: 'Почитать', value: 'read' },
  ];

  return (
    <div>
      <div>
        {tabs.map(t => (
          <button key={t.value} style={{ border: t.value === selectedTab ? '1px solid red' : undefined }} onClick={() => setSelectedTab(t.value)}>{t.label}</button>
        ))}
      </div>
      <div>
        {itemsFiltered.map((i) => (<div style={{ display: 'inline-block', border: '1px solid black', margin: 10, padding: 5 }} key={i.id}>{i.name}</div>))}
      </div>
      <button onClick={() => {
        setIsEditorVisible(true);
      }}>Добавить</button>
      {isEditorVisible && (
        <div style={{ display: 'inline-block', border: '1px solid black', margin: 10, padding: 5 }}>
          <input type="text" value={editorText} onChange={e => setEditorText(e.target.value)} onKeyUp={(e) => {
              if (e.key === 'Enter') {
                setItems([
                  ...items,
                  {id: guid(), name: editorText, action_type: selectedTab}
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

// generates random id;
// of course it's better to use uuid library, but decided this way is good enough for pet project
let guid = () => {
  let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
  }
  // return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export default App;
