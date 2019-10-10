import React, { useState, useEffect } from 'react';

// import { Container } from './styles';

export default function App() {
  const [repos, setRepos] = useState([]);

  useEffect(async () => {
    const response = await fetch(
      'https://api.github.com/users/DaniloSouzaDev/repos'
    );
    const data = await response.json();
    setRepos(data);
  }, []);

  useEffect(() => {
    const contFavorited = repos.filter(repo => repo.favorite);
    document.title = `Você tem ${contFavorited.length} favoritos`;
  }, [repos]);

  function handleAddFavorite(id) {
    const favoritered = repos.map(repo => {
      return repo.id === id
        ? {
            ...repo,
            favorite: !repo.favorite,
          }
        : repo;
    });
    setRepos(favoritered);
  }

  return (
    <ul>
      {repos.map(repo => (
        <li key={repo.id}>
          {repo.name}
          {repo.favorite && <span> (FAVORITO)</span>}
          <button onClick={() => handleAddFavorite(repo.id)} type="button">
            {repo.favorite ? (
              <span> Desfavoritar</span>
            ) : (
              <span> Favoritar</span>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}

// import React, { useState, useEffect } from 'react';

// // import { Container } from './styles';

// export default function App() {
//   const [repositories, setRepositories] = useState([]);

//   useEffect(async () => {
//     const response = await fetch(
//       'https://api.github.com/users/DaniloSouzaDev/repos'
//     );
//     const data = await response.json();
//     setRepositories(data);
//   }, []);

//   useEffect(() => {
//     const filtered = repositories.filter(repo => repo.favorite);
//     document.title = `Você tem: ${filtered.length} favoritos`;
//   }, [repositories]);

//   function handleFavorites(id) {
//     const newRepos = repositories.map(repo => {
//       return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo;
//     });
//     setRepositories(newRepos);
//   }

//   return (
//     <ul>
//       {repositories.map(repo => (
//         <li key={repo.id}>
//           {repo.name}
//           {repo.favorite && <span> (FAVORITO) </span>}

//           <button onClick={() => handleFavorites(repo.id)} type="button">
//             Favoritar
//           </button>
//         </li>
//       ))}
//     </ul>
//   );
// }
