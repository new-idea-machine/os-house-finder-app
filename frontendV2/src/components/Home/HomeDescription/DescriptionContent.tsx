function DescriptionContent() {
  const contentData = [
    {
      id: 1,
      title: 'Compare',
      description:
        'exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      id: 2,
      title: 'Profile',
      description:
        'exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      id: 3,
      title: 'Value',
      description:
        'exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      id: 4,
      title: 'Score',
      description:
        'exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-8 px-48 py-12 2xl:px-36">
      {contentData.map((content) => (
        <div className="w-[430px] px-8 py-6" key={content.id}>
          <h3 className="mb-4 text-3xl font-bold">{content.title}</h3>
          <p className="text-xl">{content.description}</p>
        </div>
      ))}
    </div>
  );
}

export default DescriptionContent;
