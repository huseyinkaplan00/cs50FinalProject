import React from "react";
const Defines = ({ words, allCategories, meanings }) => {
  // getting link of the worlds to set src in a tags.
  const [linkOfTheWords, setLinkOfTheWords] = React.useState("");
  return (
    <div className="defines">
      {words === "" ? (
        <span className="defines-title">Please Write Your Word to Search</span>
      ) : (
        meanings.map((means) => {
          // console.log(means.sourceUrls[0]);
          means.meanings.map((item) => {
            item.definitions.map((def) => console.log(def));
          });
        })
      )}
    </div>
  );
};

export default Defines;
