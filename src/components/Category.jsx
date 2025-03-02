const DataButton = [
    { id: 0, title: "Semua" },
    { id: 10, title: "Musik" },
    { id: 22, title: "Entertainment" },
    { id: 17, title: "Olahraga" },
    { id: 23, title: "Komedi" },
  ];
  
  const Category = ({ handleCategory, categoryId }) => {
    return (
      <div className="flex flex-row gap-3 w-full justify-start">
        {DataButton.map((item) => {
          return (
            <button
              key={item.id}
              onClick={() => handleCategory(item.id)}
              className={`${
                categoryId === item.id &&
                "!bg-black text-white dark:!bg-white dark:text-black"
              } bg-gray-100  dark:bg-slate-700 py-2 px-4 rounded-lg transition duration-300 ease-in-out cursor-pointer text-sm font-semibold`}
            >
              {item.title}
            </button>
          );
        })}
      </div>
    );
  };
  
  export default Category;
  