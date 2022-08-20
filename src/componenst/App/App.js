import React from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProtectedRouteAuth from '../ProtectedRouteAuth.js/ProtectedRouteAuth';
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

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [moviesInfo, setMoviesInfo] = React.useState([]);
  const [visibleData, setVisibleData] = React.useState([]);
  const [visibleSaveData, setVisibleSaveData] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [savedMovies, setSavedMovies] = React.useState([])
  const [currentUser, setCurrentUser] = React.useState({ name: '', email: '', password: '' });
  const [userData, setUserData] = React.useState({});
  const [confirm, setConfirm] = React.useState(false);
  const [confirmError, setConfirmError] = React.useState(false);
  const [preload, setPreload] = React.useState(false);
  const [onButton, setOnButton] = React.useState(false);

  const history = useHistory();
  const location = history.location.pathname;

  //Валидация форм поиска по фильмам
  const text = UseInput('', { isEmpty: true, maxLengthError: 30 });
  const textValid = ((text.isDirty && text.isEmpty) || (text.isDirty && text.minLengthError) || (text.isDirty && text.maxLengthError));

  const [textState, setTextState] = React.useState('');


  //Валидация форм поиска по сохранённым фильмам
  const textSave = UseInput('', { isEmpty: true, maxLengthError: 30 });
  const textSaveValid = ((text.isDirty && text.isEmpty) || (text.isDirty && text.minLengthError) || (text.isDirty && text.maxLengthError));

  //Рендер данных на стр.
  React.useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem('jwt');
      if (token) {
        // setPreload(true); // Показываю прелоадер
        Promise.all([mainApi.getUserInfo(token),
        api.getInitialMovies(token),
        ])
          .then(([data, moviesInfo]) => {
            setCurrentUser(data[0]);
            setMoviesInfo(moviesInfo); // Рендер фильмов
            // if (moviesInfo.length > 0) {
            //   setPreload(false); // Скрываю прелоадер
            // }
          })
          .catch((err) => {
            console.error(err)
          })
      }
    }
  }, [loggedIn])

  // //Сохранение состояния поиска (результат поиска фильмов)
  React.useEffect(() => {
    // setPreload(true);
    setVisibleData(JSON.parse(localStorage.getItem('visibleData')));
    // setPreload(false);
  }, [])

  React.useEffect(() => {
    localStorage.setItem('visibleData', JSON.stringify(visibleData));
  }, [visibleData]);

  // Сохранение состояния строки поиска фильмов
  React.useEffect(() => {
    setTextState(JSON.parse(localStorage.getItem('textState')));
  }, [])
  React.useEffect(() => {
    localStorage.setItem('textState', JSON.stringify(textState));
  }, [textState])

  // Отвечает за то, чтоб у каждого пользователя были свои сохранённые фильмы
  function filterSaveMovies(movies) {
    const myId = currentUser._id;
    const myMovies = movies.filter((movie) => {
      const { owner = '' } = movie;
      return myId === owner;
    });
    return myMovies;
  }

  // Рендер сохранённых карточек
  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (currentUser) {
      // setPreload(true);
      Promise.resolve(mainApi.getSavedMovies(token))
        .then((savedMovies) => {
          setSavedMovies(filterSaveMovies(savedMovies));  
          // if (savedMovies.length > 0) {
          //   setPreload(false);
          // } 
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [currentUser])

  // //Отобразить 16 карточек в сохранённых
  React.useEffect(() => {
    // setPreload(true);
    const arr = savedMovies.slice(0, 16)
    setVisibleSaveData(arr);
    // setPreload(false);

  }, [savedMovies])

  // //Добавление карточки App.js
  const handleAddPlaceSubmit = async (movieToSave) => {
    movieToSave = {
      country: movieToSave.country || "",
      director: movieToSave.director || "",
      duration: movieToSave.duration || 0,
      year: movieToSave.year || "",
      description: movieToSave.description || "",
      image: movieToSave.image,
      trailer: movieToSave.trailer || "https://youtube.ru",
      thumbnail: movieToSave.thumbnail || "https://youtube.ru",
      movieId: movieToSave.movieId,
      nameRU: movieToSave.nameRU || "",
      nameEN: movieToSave.nameEN || "",
    };
    const token = localStorage.getItem('jwt');
    mainApi.addMovie(movieToSave, token)
      .then((newCard) => {
        setSavedMovies([newCard, ...savedMovies]);
      })
      .catch((err) => console.log(err))
  }

  //Удаление карточки
  const removeCard = (_id) => {
    const token = localStorage.getItem('jwt');
    mainApi.deleteMovies(_id, token)
      .then(() => {
        setSavedMovies([...savedMovies.filter(el => el.movieId !== _id)]);
      })
      .catch((err) => console.log(err))
  }

  //Чекбокс короткометражки
  React.useEffect(() => {
    setOnButton(JSON.parse(localStorage.getItem('onButton')));
  }, [])

  React.useEffect(() => {
    localStorage.setItem('onButton', JSON.stringify(onButton));
  }, [onButton]);


  //Получение данных пользователя
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
          // history.push(location)
        }
      })
  };

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth(jwt);
      history.push(location);
    }
  }, [history, location, loggedIn]);


  //Функция регистрации
  const onRegister = ({ name, email, password }) => {
    return Auth.register(name, email, password)
      .then((res) => {
        if (!res || res.statusCode === 400) throw new Error('Что-то пошло не так')
        return res;
      })
      .then(() => onLogin({ email, password }))
  };

  //Функция авторизации
  const onLogin = ({ email, password }) => {
    return Auth.login(email, password).then((res) => {
      if (!res.token) throw new Error('Неправильные имя пользователя или пароль');
      else {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        history.push('/movies')
      }
    })
  };

  // Выйти из акаунта
  const onSignOut = () => {
    // удаляем токен
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    // обновляю стостояние показанных фильмов
    setVisibleData(localStorage.removeItem('visibleData'));
    // обновляю состояние радмокнипки
    setOnButton(false);
    // очистка строки поиска
    setTextState('')
    // обновляю стостояние показанных фильмов
    const arr = moviesInfo.slice(0, 16)
    setVisibleData(arr);
    // Скидываю сообщение об ошибке/удаче смены пользователя
    setConfirm(false);
    setConfirmError(false);
    history.push('/');
  };

  React.useEffect(() => {

  }, [userData])

  //Редактирование данных пользователя
  const handleUpdateUser = ({ email, name }) => {
    const token = localStorage.getItem('jwt');
    // if (email === currentUser.email) throw new Error('Такой email уже существует')
    mainApi.setUserInfo({ name, email }, token)
      .then((data) => {
        setCurrentUser(data);
        setConfirm(true);
        setConfirmError(false);
      })
      .catch((err) => {
        setConfirm(false);
        setConfirmError(true);
        console.log(err)
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Switch>
            <Route exact loggedIn={loggedIn} path="/">
              <Main loggedIn={loggedIn} />
            </Route>

            <ProtectedRoute exact loggedIn={loggedIn} path="/movies"
              moviesInfo={moviesInfo} onButton={onButton} setOnButton={setOnButton}
              handleAddPlaceSubmit={handleAddPlaceSubmit}
              setTextState={setTextState} textState={textState}
              visibleData={visibleData} setVisibleData={setVisibleData}
              search={search} setSearch={setSearch} preload={preload}
              text={text} textValid={textValid} removeCard={removeCard} savedMovies={savedMovies} setPreload={setPreload}
              component={Movies} />

            <ProtectedRoute exact loggedIn={loggedIn} path="/saved-movies"
              setSearch={setSearch} removeCard={removeCard}
              text={textSave} textValid={textSaveValid} savedMovies={savedMovies} setSavedMovies={setSavedMovies}
              visibleSaveData={visibleSaveData} setVisibleSaveData={setVisibleSaveData}
              search={search} moviesInfo={moviesInfo} preload={preload} setPreload={setPreload}
              component={SavedMovies} />

            <ProtectedRoute exact loggedIn={loggedIn} path="/profile"
              handleUpdateUser={handleUpdateUser}
              onSignOut={onSignOut} setConfirm={setConfirm} setConfirmError={setConfirmError}
              userData={userData} confirm={confirm} confirmError={confirmError}
              component={Profile} />

            <ProtectedRouteAuth exact loggedIn={loggedIn} path="/signup"
              component={Register} onRegister={onRegister} />

            <ProtectedRouteAuth exact loggedIn={loggedIn} path="/signin"
              component={Login} onLogin={onLogin} />

            <Route path='*'>
              <ErrorHandler location={location} />
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