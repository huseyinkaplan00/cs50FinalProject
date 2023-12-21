import PropTypes from 'prop-types';
import axios from 'axios';
import React from 'react';

export default function Home({ wordMeanings, setWordMeanings, setWords }) {
  const activate = e => {
    const slider = document.querySelector('.slider');
    const items = slider.querySelectorAll('.item');

    if (e.target.matches('.next')) {
      slider.append(items[0]);
    } else if (e.target.matches('.prev')) {
      slider.prepend(items[items.length - 1]);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', activate);

    // Component kaldırıldığında event listener'ı temizle
    return () => {
      document.removeEventListener('click', activate);
    };
  }, []);

  const filteredWordMeanings = React.useMemo(
    () =>
      wordMeanings.filter(
        wordMeaning => wordMeaning.meaning !== 'Definition not available' && wordMeaning.image !== null
      ),
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
    if (filteredWordMeanings && filteredWordMeanings.length > 5) {
      getWordImage();
    }
  }, [filteredWordMeanings]);

  return (
    <>
      {filteredWordMeanings.length > 0 && (
        <main>
          <ul className="slider">
            {filteredWordMeanings.map(({ word, meaning, image }, index) => (
              <li key={index} className="item" style={{ backgroundImage: `url(${image})` }}>
                <div className="content">
                  <h2 className="title">{word}</h2>
                  <p className="description">{meaning}</p>
                  <button onClick={() => setWords(word)}>Read More</button>
                </div>
              </li>
            ))}
          </ul>
          <nav className="nav">
            <div className="btn prev" />
            <div className="btn next" />
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
