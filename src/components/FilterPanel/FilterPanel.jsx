import Select, { SelectItem } from 'react-dropdown-select';
import "./FilterPanel.css";

const filterTypes = {
  category: {
    options: [
      { 
        value: "sneakers",
        label: "sneakers",
      },
      {
        value: "flats",
        label: "flats"
      },
      {
        value: "sandals",
        label: "sandals"
      },
      {
        value: "heels",
        label: "heels"
      }
    ],
  },
  // price: {
  //   options: [
  //     {
  //       value: "50",
  //       label: "$0 - 50",
  //     },
  //     {
  //       value: "100",
  //       label: "$50 - $100",
  //     },
  //     {
  //       value: "150",
  //       label: "$100 - $150",
  //     },
  //     {
  //       value: "1000",
  //       label: "Over $150",
  //     },
  //   ]
  // },
  colors: {
    options: [
      // {
      //   value: "all",
      //   label: "all",
      // },
      {
        value: "black",
        label: "black",
      },
      {
        value: "blue",
        label: "blue",
      },
      {
        value: "red",
        label: "red",
      },
      {
        value: "green",
        label: "green",
      },
      {
        value: "white",
        label: "white",
      },
    ],
  //   itemRenderer: (item) => {
  //     console.log("item: ", item)
  //     return (
  //     <div><span style={{ backgroundColor: item.item.value, width: "10px", height: "10px" }}></span>{item.item.value}</div>
  //   )
  // },
    // styles: {
    //   control: (baseStyles, state) => ({
    //     ...baseStyles,
    //     borderColor: state.isFocused ? 'grey' : state.value,
    //   }),
    // },
    // multiValueLabel: (styles, { data }) => {
    //   console.log("data: ", data)
    //   // const color = chroma(data.label);
    //   return {
    //     ...styles,
    //     // backgroundColor: color.alpha(0.1).css(),
    //     backgroundColor: data.value,
    //   };
    // },
  }
};

const FilterPanel = (props) => {
  return (
    <div className="filterPanel">
      {Object.entries(filterTypes).map(([key, value], idx) => {
        const values = props.filter[key].map((i) => i.value);
        return (
          <Select
            {...value}
            placeholder={`Select ${key}`}
            searchable={false}
            style={{border: "1px solid var(--tg-theme-button-color)", color: "var(--tg-theme-hint-color)"}}
            multi
            key={idx}
            options={value.options}
            values={values}
            onChange={(item) => {
              console.log("item: ", item);
              props.onChange(key, item);
            }}
          />
        )
      })}
    </div>
  )
}

export default FilterPanel;