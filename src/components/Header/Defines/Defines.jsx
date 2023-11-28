import { all } from "axios";
import React from "react";
import PropTypes from "prop-types";
const Defines = ({ words, allCategories, meanings }) => {
  // getting link of the worlds to set src in a tags.
  const [linkOfTheWords, setLinkOfTheWords] = React.useState("");
  const playAudio = (audio) => {
    const audioLink = new Audio(audio);
    audioLink.play();
  };
  return (
    <div className="defines">
      {words === "" ? (
        <div>Search a word</div>
      ) : (
        meanings.map((mean) => {
          const wordsLink = mean.sourceUrls.map((item) => (item ? item : "#"));
          const audioLink = mean.phonetics.map((item) => item.audio);

          return mean.meanings.map((item, index) => (
            <div key={index}>
              <div className="word__header">
                <span className="defines--part-of-spech">
                  <a href={wordsLink}> {mean.word} </a> (
                  {item.partOfSpeech ? item.partOfSpeech : "🥲"})
                </span>
              </div>
              <div className="defines--definitions">
                {item.definitions.map((def, index) => (
                  <div key={index} className="defines-definitions-single-word">
                    <h4>Definition : </h4>
                    {def.definition}
                    <br />
                    {def.example && (
                      <div className="examples">
                        <span className="examples">
                          <b>Example:</b>
                          <p>{def.example}</p>
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ));
        })
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
