import React from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import Main from '../Main/Main';
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import * as Auth from '../../utils/Auth';
import api from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import UseInput from '../UseInput/UseInput';


// import MoviesCardList from '../MoviesCardList/MoviesCardList';


function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [moviesInfo, setMoviesInfo] = React.useState([]);
  const [saviedMoviesInfo, setSaviedMoviesInfo] = React.useState([])
  const [visibleData, setVisibleData] = React.useState([])
  const [search, setSearch] = React.useState('');
  const [moviesData, setMoviesData] = React.useState([])
  const [savedMovies, setSavedMovies] = React.useState([])

  const [currentUser, setCurrentUser] = React.useState({ name: '', email: '', password: '' });
  const [userData, setUserData] = React.useState({})
  const [indexMovies, setIndexMovies] = React.useState(0);

  const history = useHistory();

  //Валидация форм поиска по фильмам
  const text = UseInput('', { isEmpty: true, minLengthError: 2, maxLengthError: 30 });
  const textValid = ((text.isDirty && text.isEmpty) || (text.isDirty && text.minLengthError) || (text.isDirty && text.maxLengthError));

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      Promise.all([mainApi.getUserInfo(token),
      api.getInitialMovies(token), mainApi.getSavedMovies(token)
      ])
        .then(([data, moviesInfo, saveData]) => {
          setCurrentUser(data[0]);
          setMoviesInfo(moviesInfo);
          setMoviesData(moviesInfo);
          setSavedMovies(saveData);
        })
        .catch(() => {
          console.error('Что-то сломалось!')
        })
    }
  }, [loggedIn])

  React.useEffect(() => {
    const arr = moviesData.slice(0, 15)
    setVisibleData(arr);
  }, [moviesData])

  //Добавление карточки App.js
  // const handleAddPlaceSubmit = async ({description, director, duration, image, movieId, owner, thumbnail, trailer, year, _id}) => {
  //   const token = localStorage.getItem('jwt');
  //   debugger
  //   mainApi.addTask({description, director, duration, image, movieId, owner, thumbnail, trailer, year, _id}, token)
  //   .then((newCard) => {
  //     console.log('12')
  //     setSaviedMoviesInfo([newCard, ...moviesInfo]);
  //   })
  //   .catch(() => console.log('Что-то сломалось!'))
  // }
  // //Добавление карточки App.js
  const handleAddPlaceSubmit = async (movieToSave) => {
    movieToSave = {
      country: movieToSave.country || "",
      director: movieToSave.director || "",
      duration: movieToSave.duration || 0,
      year: movieToSave.year || "",
      description: movieToSave.description || "",
      image: movieToSave.link || "https://youtube.ru",
      trailer: movieToSave.trailer || "https://youtube.ru",
      thumbnail: movieToSave.thumbnail || "https://youtube.ru",
      movieId: movieToSave.movieId,
      nameRU: movieToSave.nameRU || "",
      nameEN: movieToSave.nameEN || "",
    };
    const token = localStorage.getItem('jwt');
    mainApi.addTask(movieToSave, token)
      .then((newCard) => {
        console.log('12')
        setSaviedMoviesInfo([newCard, ...saviedMoviesInfo]);
      })
      .catch((err) => console.log(err))
  }

  //Удаление карточки
  const removeCard = (id) => {
    setVisibleData([...visibleData.filter(el => el.id !== id)]);
  }

  const auth = async (jwt) => {
    return Auth.getContent(jwt)
      .then((res) => {
        let resEmail = res.map(i => i.email);
        let resName = res.map(i => i.name);
        // Проверка токена, если токен ваидный записываем данные в state, иначе удаляем токен из localStorage; 
        if (res) {
          setLoggedIn(true);
          setUserData({
            email: resEmail.join(''),
            name: resName.join('')
          });
        }
      })
  };

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth(jwt);
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) history.push('/movies');
  }, [loggedIn]);

  //Функция регистрации
  const onRegister = ({ name, email, password }) => {
    return Auth.register(name, email, password).then((res) => {
      if (!res || res.statusCode === 400) throw new Error('Что-то пошло не так')
      return res;
    })
  };

  //Функция авторизации
  const onLogin = ({ email, password }) => {
    return Auth.login(email, password).then((res) => {
      if (!res.token) throw new Error('Неправильные имя пользователя или пароль');
      else {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
      }
    })
  };

  // Выйти из акаунта
  const onSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/');
  };

  React.useEffect(() => {

  }, [userData])

  const handleUpdateUser = ({ email, name }) => {
    const token = localStorage.getItem('jwt');
    mainApi.setUserInfo({ name, email }, token)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch(() => console.log('Что-то сломалось!'))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Switch>

            <Route exact loggedIn={loggedIn} path="/">
              <Main />
            </Route>

            <ProtectedRoute exact loggedIn={loggedIn} path="/movies"
              moviesInfo={moviesInfo} setMoviesInfo={setMoviesInfo}
              handleAddPlaceSubmit={handleAddPlaceSubmit}
              visibleData={visibleData} setVisibleData={setVisibleData}
              search={search} setSearch={setSearch}
              text={text} textValid={textValid} moviesData={moviesData}
              component={Movies} />

            <ProtectedRoute exact loggedIn={loggedIn} path="/saved-movies"
              saviedMoviesInfo={saviedMoviesInfo} visibleData={visibleData} setVisibleData={setVisibleData}
              search={search} setSearch={setSearch} removeCard={removeCard}
              text={text} textValid={textValid} savedMovies={savedMovies}
              component={SavedMovies} />

            <ProtectedRoute exact loggedIn={loggedIn} path="/profile"
              handleUpdateUser={handleUpdateUser}
              onSignOut={onSignOut}
              userData={userData}
              component={Profile} />

            <Route path="/error">
              <ErrorHandler />
            </Route>

            <Route path="/signup">
              <Register onRegister={onRegister} />
            </Route>

            <Route path="/signin">
              <Login
                onLogin={onLogin}
              />
            </Route>

            <Route>
              {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/" />}
            </Route>

          </Switch>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;