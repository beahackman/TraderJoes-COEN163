import React from "react";
import "./Items.css";
import ItemCard from "./ItemCard";
import getItems from "../../helpers/getItems";
import { CATEGORIES } from "../../enums/categories";

export default function Items() {
  const items = getItems();

  const [category, setCategory] = React.useState(CATEGORIES[0]);
  const [subcategory, setSubcategory] = React.useState(null);
  const [filteredItems, setFilteredItems] = React.useState(items);

  React.useEffect(() => {
    category
      ? setFilteredItems(
          items.filter((item) =>
            item.categories.includes(category.name) && (subcategory
              ? item.subcategories.includes(subcategory)
              : true)
          )
        )
      : setFilteredItems(items);
  }, [items, category, subcategory]);

  return (
    <div>
      {CATEGORIES.map((category, index) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          key={index}
          onClick={() => {
            setCategory(category);
            setSubcategory(null);
          }}
        >
          {category.name}
        </a>
      ))}
      <div>
        {category &&
          category.subcategories.map((subcategory, index) => (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a key={index} onClick={() => setSubcategory(subcategory)}>
              {subcategory}
            </a>
          ))}
      </div>
      {filteredItems.map((item, index) => (
        <ItemCard key={index} item={item} />
      ))}
    </div>
  );
}
