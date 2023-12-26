import PropTypes from 'prop-types';
import axios from 'axios';
import React from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
export default function Home({ wordMeanings, setWordMeanings, setWords, words, darkMode }) {
  const [counter, setCounter] = React.useState(0);
  const [maxCounter] = React.useState(3);

  const activate = e => {
    const slider = document.querySelector('.slider');
    const items = slider.querySelectorAll('.item');

    // Ebeveyn öğesinin sınıfını kontrol et
    let parent = e.target.parentElement;

    if (parent && parent.matches('.next')) {
      slider.append(items[0]);
    } else if (parent && parent.matches('.prev')) {
      slider.prepend(items[items.length - 1]);
    }
  };

  const moveSlider = direction => {
    const slider = document.querySelector('.slider');
    const items = slider.querySelectorAll('.item');

    if (direction === 'next') {
      slider.append(items[0]);
    } else if (direction === 'prev') {
      slider.prepend(items[items.length - 1]);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', activate);

    return () => {
      document.removeEventListener('click', activate);
    };
  }, []);

  const filteredWordMeanings = React.useMemo(
    () =>
      wordMeanings
        .filter(wordMeaning => wordMeaning.meaning !== 'Definition not available' && wordMeaning.image !== null)
        .slice(0, 6),
    [wordMeanings]
  );

  const getWordImage = async () => {
    if (filteredWordMeanings && filteredWordMeanings.length > 0) {
      try {
        const responses = await Promise.all(
          filteredWordMeanings.map(async wordMeaning => {
            const response = await axios.get(
              `https://pixabay.com/api/?key=41114972-550a8ff6a7b32dec7a2800aae&q=${encodeURIComponent(
                wordMeaning.word
              )}&image_type=photo`
            );
            const imageUrls = response.data.hits[0] ? response.data.hits[0].largeImageURL : null;
            return { ...wordMeaning, image: imageUrls };
          })
        );
        setWordMeanings(responses);
      } catch (error) {
        console.error(error);
      }
    }
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (counter < maxCounter) {
        getWordImage();
        setCounter(prevCounter => prevCounter + 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [counter]);

  return (
    <>
      {filteredWordMeanings.length > 0 && (
        <main>
          <ul className="slider">
            {filteredWordMeanings.map(({ word, meaning, image }, index) => (
              <li key={index} className="item" style={{ backgroundImage: `url(${image})` }}>
                <div style={{ background: darkMode ? 'rgb(0, 0, 0, 0.60)' : '#ffffffb8' }} className="content">
                  <h2
                    style={{
                      color: darkMode ? 'white' : 'black'
                    }}
                    className="title">
                    {word}
                  </h2>
                  <p className="description">{meaning}</p>
                  <button
                    style={{
                      border: darkMode ? 'solid white 3px' : 'solid black 3px',
                      color: darkMode ? 'white' : 'black'
                    }}
                    onClick={() => setWords(word)}>
                    Read More
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <nav className="nav">
            <Stack direction="row" spacing={2}>
              <IconButton variant="outlined" className="btn prev" color="black" onClick={() => moveSlider('prev')}>
                <NavigateBeforeIcon />
              </IconButton>
              <IconButton className="btn next" color="black" onClick={() => moveSlider('next')}>
                <NavigateNextIcon />
              </IconButton>
            </Stack>
          </nav>
        </main>
      )}
    </>
  );
}

// // declaring prop types for type checking.
// Home.propTypes = {
//   wordMeanings: PropTypes.array.isRequired,
//   setWordMeanings: PropTypes.func.isRequired,
//   setWords: PropTypes.func.isRequired,
//   filteredWordMeanings: PropTypes.array.isRequired
// };
