import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";

const Defines = ({ words, meanings, Defines }) => {
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
          console.log(mean.phonetic); // burada phoneticler geliyor ama kelime şeklinde almalıyız ve her birini ayrı ayrı kullanmalıyız.
          const wordsLink = mean.sourceUrls.map((item) => (item ? item : ""));
          const audioLink = mean.phonetics.map((item, index) => {
            return (
              item.audio && (
                <IconButton
                  style={{ color: "#fff" }}
                  key={index}
                  onClick={() => playAudio(item.audio)}
                  aria-label="delete"
                >
                  <VolumeDownIcon />
                </IconButton>
              )
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
                  <div className="defines--part-of-spech">
                    <a href={wordsLink}> {mean.word} </a> (
                    <span>
                      {" "}
                      {item.partOfSpeech ? item.partOfSpeech : "🥲"})
                    </span>
                    {meanings.map((item, index) => (
                      <em key={index}>{item.phonetic ? item.phonetic : ""}</em>
                    ))}
                  </div>
                </div>
                <div className="defines--definitions">
                  {item.definitions.map((def, index) => (
                    <div
                      key={index}
                      className="defines-definitions-single-word"
                    >
                      <div className="  ">
                        <h4>Definition : </h4>
                        <p>{def.definition}</p>
                      </div>
                      {def.example && (
                        <div className="examples">
                          <div className="examples">
                            <h4>Example:</h4>
                            <p>{def.example}</p>
                          </div>
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
