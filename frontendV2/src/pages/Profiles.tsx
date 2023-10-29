import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function Profiles() {
  const [tabs, setTabs] = useState([
    { name: 'Profile', value: 'profile1' },
    { name: 'Profile', value: 'profile2' },
    { name: 'Profile', value: 'profile3' },
    { name: 'Profile', value: 'profile4' },
    { name: 'Profile', value: 'profile5' },
  ]);

  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <div className="p-4">{tab.value}</div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default Profiles;
