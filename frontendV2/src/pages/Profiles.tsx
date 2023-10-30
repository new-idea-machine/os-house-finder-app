import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

function Profiles() {
  const [tabs, setTabs] = useState([
    { name: 'Profile 1', value: 'profile1' },
    { name: 'Profile 2', value: 'profile2' },
    { name: 'Profile 3', value: 'profile3' },
    { name: 'Profile 4', value: 'profile4' },
    { name: 'Profile 5', value: 'profile5' },
  ]);

  return (
    <Tabs
      defaultValue="profile1"
      className="flex h-full max-w-none animate-in animate-out"
    >
      <TabsList
        className="flex h-full min-h-[75vh] w-1/4 flex-col justify-between space-y-5 rounded-none border-r-2
      border-primary bg-white"
      >
        <section className="mt-8 flex w-full flex-col space-y-4">
          <h2 className="mx-4 text-2xl font-bold">Profiles</h2>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="mx-4 bg-primary text-xl text-white data-[state=active]:bg-secondary data-[state=active]:text-white"
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </section>
        <Button>Add New Profile</Button>
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
