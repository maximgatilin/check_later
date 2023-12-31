import * as S from './styles';

type Tab = {
  label: string;
  value: string;
};

interface TabsProps {
  activeTab: string;
  onSelect: (value: string) => void;
  tabs: Tab[];
}

export default function Tabs(props: TabsProps) {
  const { activeTab, onSelect, tabs } = props;

  return (
    <S.Container>
      {tabs.map((tab) => (
        <S.Tab
          key={tab.value}
          onClick={() => onSelect(tab.value)}
          $active={tab.value === activeTab}
        >
          {tab.label}
        </S.Tab>
      ))}
    </S.Container>
  );
}
