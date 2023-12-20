import './App.css';
import AddItem from './components/AddItem/AddItem';
import Card from './components/Card/Card';
import CardList from './components/CardList/CardList';
import { Intro } from './components/Intro/Intro';
import Tabs from './components/Tabs/Tabs';
import { useContent } from './utils/contexts/ContentContext';
import { ActionType } from './utils/sharedTypes';

function App() {
  const {
    filteredItems,
    selectedTab,
    setSelectedTab,
    addContentItem,
    imageGenerationIdsInProgress,
  } = useContent();

  return (
    <div>
      <Intro />
      <Tabs
        activeTab={selectedTab}
        onSelect={(value: string) => setSelectedTab(value)}
        tabs={[
          { label: 'Посмотреть', value: 'watch' },
          { label: 'Почитать', value: 'read' },
        ]}
      />
      <CardList>
        {filteredItems.map((i) => (
          <Card
            actionType={i.actionType}
            id={i.id}
            name={i.name}
            image={i.image}
            key={i.id}
            isImageGenerationInProgress={imageGenerationIdsInProgress[i.id] === true}
          />
        ))}
        <AddItem
          onAdd={addContentItem}
          actionType={selectedTab as ActionType}
        />
      </CardList>
    </div>
  );
}

export default App;
