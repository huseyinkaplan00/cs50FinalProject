import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
const Defines = ({ words, allCategories, meanings }) => {
  const playAudio = (audio) => {
    const audioLink = new Audio(audio);
    audioLink.play();
  };
  return (
    <div className="defines">
      {words === "" ? (
        <div className="defines--home">Type your word</div>
      ) : (
        meanings.map((mean) => {
          const wordsLink = mean.sourceUrls.map((item) => (item ? item : ""));
          const audioLink = mean.phonetics.map((item, index) => {
            return (
              <IconButton
                style={{ color: "#fff" }}
                key={index}
                onClick={() => playAudio(item.audio)}
                aria-label="delete"
              >
                <VolumeDownIcon />
              </IconButton>
            );
          });

          return mean.meanings.map((item, index) => {
            return (
              <div key={index}>
                <div
                  style={{ margin: audioLink.length > 0 ? "" : "10px" }}
                  className="word__header"
                >
                  {audioLink ? audioLink : null}
                  <span className="defines--part-of-spech">
                    <a href={wordsLink}> {mean.word} </a> (
                    <span>
                      {" "}
                      {item.partOfSpeech ? item.partOfSpeech : "🥲"})
                    </span>
                  </span>
                </div>
                <div className="defines--definitions">
                  {item.definitions.map((def, index) => (
                    <div
                      key={index}
                      className="defines-definitions-single-word"
                    >
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
                      {def.synonyms.length > 0 && (
                        <span>
                          <b>Synonyms :</b>{" "}
                          {def.synonyms.map((s) => {
                            return `${s},`;
                          })}{" "}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          });
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
