import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';

const Defines = ({ meanings, darkMode, error }) => {
  const playAudio = audio => {
    const audioLink = new Audio(audio);
    audioLink.play();
  };
  return (
    <div className="defines">
      {error && ( // if error is true, then show the error message.
        <div className="defines--error">{error}</div>
      )}
      {error === '' &&
        meanings.map(mean => {
          const wordsLink = mean.sourceUrls.map(item => (item ? item : ''));
          const audioLink = mean.phonetics.map((item, index) => {
            return (
              item.audio && (
                <IconButton
                  style={{ color: darkMode ? '#fff' : '#000' }}
                  key={index}
                  onClick={() => playAudio(item.audio)}
                  aria-label="delete">
                  <VolumeDownIcon />
                </IconButton>
              )
            );
          });

          return mean.meanings.map((item, index) => {
            return (
              <div key={index}>
                <div style={{ margin: audioLink.length > 0 ? '' : '10px' }} className="word__header">
                  {audioLink ? audioLink : null}
                  <div
                    className={`defines--part-of-spech ${
                      darkMode ? 'defines--part-of-spech--dark-mode' : 'defines--part-of-spech--light-mode'
                    }`}>
                    <a
                      className={`defines--part-of-spech--link  ${
                        darkMode
                          ? 'defines--part-of-spech--link--dark-mode'
                          : 'defines--part-of-spech--link--light-mode'
                      } `}
                      href={wordsLink}>
                      {' '}
                      {mean.word}{' '}
                    </a>{' '}
                    (<span> {item.partOfSpeech ? item.partOfSpeech : '🥲'})</span>
                    {meanings.map((item, index) => (
                      <em key={index}>{item.phonetic ? item.phonetic : ''}</em>
                    ))}
                  </div>
                </div>
                <div className="defines--definitions">
                  {item.definitions.map((def, index) => (
                    <div key={index} className="defines-definitions-single-word">
                      <div>
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
                          <b>Synonyms :</b>{' '}
                          {def.synonyms.map(s => {
                            return `${s},`;
                          })}{' '}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          });
        })}
    </div>
  );
};

// declaring prop types for type checking.
Defines.propTypes = {
  words: PropTypes.string.isRequired,
  meanings: PropTypes.array.isRequired,
  darkMode: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
};

export default Defines;
