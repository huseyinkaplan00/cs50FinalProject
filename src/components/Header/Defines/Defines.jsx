import React from "react";
const Defines = ({ words, allCategories, meanings }) => {
  // getting link of the worlds to set src in a tags.

  return (
    <div className="defines">
      {words === "" ? (
        <span className="defines-title">Please Write Your Word to Search</span>
      ) : (ca
        meanings.map((means) => {
          // console.log(means.sourceUrls[0]);
          means.meanings.map((item) => {
            item.definitions.map((def) => {
              console.log(def.definition);
            });
          });
        })
      )}
    </div>
  );
};

export default Defines;
