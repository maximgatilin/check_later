import { useState, useMemo, useEffect } from 'react';
import './App.css';
import { Card } from './components/Card/Card';
import { CardList } from './components/CardList/CardList';
import { Intro } from './components/Intro/Intro';
import { Tabs } from './components/Tabs/Tabs';
import { initialItems } from './mocks/initialItems';
import DataService from './services/dataService';
import { ContentEntity } from './utils/sharedTypes';

const dataService = new DataService({key: 'check_later_items', default: initialItems});

function App() {
  const [items, setItems] = useState<ContentEntity[]>(dataService.getAll());

  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [editorText, setEditorText] = useState('');
  const [selectedTab, setSelectedTab] = useState<string>('watch');
  const itemsFiltered = useMemo(() => {
    return items.filter((i) => i.action_type === selectedTab);
  }, [items, selectedTab]);

  useEffect(() => {
    dataService.setAll(items);
  }, [items]);

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
        {itemsFiltered.map((i) => (<Card {...i} key={i.id} />))}
      </CardList>
      <button onClick={() => {
        setIsEditorVisible(true);
      }}>Добавить</button>
      {isEditorVisible && (
        <div style={{ display: 'inline-block', border: '1px solid black', margin: 10, padding: 5 }}>
          <input type="text" value={editorText} onChange={e => setEditorText(e.target.value)} onKeyUp={(e) => {
              if (e.key === 'Enter') {
                setItems([
                  ...items,
                  {id: guid(), name: editorText, action_type: selectedTab === 'watch' ? 'watch' : 'read'}
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
