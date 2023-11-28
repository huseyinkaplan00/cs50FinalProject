import { all } from "axios";
import React from "react";
import PropTypes from "prop-types";
const Defines = ({ words, allCategories, meanings }) => {
  // getting link of the worlds to set src in a tags.
  const [linkOfTheWords, setLinkOfTheWords] = React.useState("");
  return (
    <div className="defines">
      {words === "" ? (
        <div>Search a word</div>
      ) : (
        meanings.map((mean) =>
          mean.meanings.map((item, index) => (
            <div key={index}>
              <h5 className="defines--part-of-spech">{item.partOfSpeech}</h5>
              <div className="defines--definitions">
                {item.definitions.map((def, index) =>
                  console.log(index, def.definition)
                )}
                {/* {item.definitions.map((def, index) => (
                  <div key={index} className="defines--definitions-words">
                    {def.map((itemTwo, indexTwo) =>
                      console.log(itemTwo, indexTwo)
                    )}
                  </div>
                ))} */}
              </div>
            </div>
          ))
        )
      )}
    </div>
  );
};

// declaring prop types for type checking.
Defines.propTypes = {
  words: PropTypes.string.isRequired,
  allCategories: PropTypes.string.isRequired,
  meanings: PropTypes.array.isRequired,
};

export default Defines;
