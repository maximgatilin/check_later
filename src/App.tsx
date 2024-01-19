import './App.css';
import AddItem from './components/AddItem/AddItem';
import Card from './components/Card/Card';
import CardList from './components/CardList/CardList';
import { Intro } from './components/Intro/Intro';
import Tabs from './components/Tabs/Tabs';
import {
  contentItemsFiltered, selectedTab, switchTab, addItem, removeItem,
} from './store/content.slice';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { generateImage } from './store/imageGeneration.slice';
import generateRandomId from './utils/functions/generateRandomId';
import { ActionType } from './utils/sharedTypes';

function App() {
  const filteredItems = useAppSelector(contentItemsFiltered);
  const tab = useAppSelector(selectedTab);
  const dispatch = useAppDispatch();

  return (
    <div>
      <Intro />
      <Tabs
        activeTab={tab}
        onSelect={(value: string) => dispatch(switchTab(value))}
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
            isImageGenerationInProgress={i.isImageGenerationInProgress}
            onDelete={(id) => dispatch(removeItem(id))}
          />
        ))}
        <AddItem
          onAdd={(data) => {
            const id = generateRandomId();
            const actionType = tab as ActionType;
            const newItem = { id, name: data.name, actionType };
            dispatch(addItem(newItem));
            dispatch(generateImage(newItem));
          }}
          actionType={tab as ActionType}
        />
      </CardList>
    </div>
  );
}

export default App;
