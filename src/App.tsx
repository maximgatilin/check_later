import { useState } from 'react';
import './App.css';
import { Card } from './components/Card/Card';
import { CardList } from './components/CardList/CardList';
import { Intro } from './components/Intro/Intro';
import { Tabs } from './components/Tabs/Tabs';
import { useContent } from './utils/contexts/ContentContext';

function App() {
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [editorText, setEditorText] = useState('');

  const { 
    filteredItems,
    selectedTab,
    setSelectedTab,
    addContentItem,
   } = useContent();

  return (
    <div>
      <Intro />
      <Tabs
        activeTab={selectedTab}
        onSelect={(value) => setSelectedTab(value)}
        tabs={[
          { label: 'Посмотреть', value: 'watch' },
          { label: 'Почитать', value: 'read' },
        ]}
      />
      <CardList>
        {filteredItems.map((i) => (<Card {...i} key={i.id} />))}
      </CardList>
      <button onClick={() => {
        setIsEditorVisible(true);
      }}>Добавить</button>
      {isEditorVisible && (
        <div style={{ display: 'inline-block', border: '1px solid black', margin: 10, padding: 5 }}>
          <input type="text" value={editorText} onChange={e => setEditorText(e.target.value)} onKeyUp={(e) => {
              if (e.key === 'Enter') {
                addContentItem({
                  name: editorText,
                  action_type: selectedTab === 'watch' ? 'watch' : 'read'
                });
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
