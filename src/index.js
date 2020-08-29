import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';


const authors = [
  {
    name: "Von Miller",
    imageUrl: 'https://a.espncdn.com/i/headshots/nfl/players/full/13976.png',
    imageSource: 'Wikimedia Commons',
    books: ['Denver Broncos']
  },
  {
    name: "Ezekiel Elliot",
    imageUrl: 'https://static.www.nfl.com/image/private/t_player_profile_landscape/f_auto/league/mphucnl2h80vne21dzik',
    imageSource: 'Wikimedia Commons',
    books: ['Dallas Cowboys']
  },
  {
    name: "Tom Brady",
    imageUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/2330.png&w=350&h=254',
    imageSource: 'Wikimedia Commons',
    books: ['New England Patriots', 'Tampa Bay Buccaneers']
  },
  {
    name: "Michael Vick",
    imageUrl: 'https://i2.wp.com/www.sportstalkatl.com/wp-content/uploads/2017/06/mike-vick-032115-ftr-twjpeg_294dh77lirc71j3mdwecl63y9.jpg?fit=1920%2C1080&ssl=1',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Piniguino',
    books: ['Atlanta Falcons','Philadelphia Eagles', 'Pittsburgh Steelers', 'New York Jets']
  },
  {
    name: "Aqib Talib",
    imageUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/11254.png',
    imageSource: 'Wikimedia Commons',
    books: ['Denver Broncos', "LA Rams"]
  },
  {
    name: "A.J. Green",
    imageUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/13983.png&w=350&h=254',
    imageSource: 'Wikimedia Commons',
    books: ['Cincinnati Bengals']
  }

];

function getTurnData(authors) {
  const allBooks = authors.reduce(function (p,c,i) {
    return p.concat(c.books);
  }, []);
  const fourRandomBooks = shuffle(allBooks).slice(0,4);
  const answer = sample(fourRandomBooks);

  return {
    books: fourRandomBooks,
    author: authors.find((author) => author.books.some((title) =>
    title === answer))
  }
}

function resetState() {
  return {
    turnData: getTurnData(authors),
    highlight: ''
  };
}

let state = resetState();

function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some((book) => book === answer);
  state.highlight = isCorrect ? 'correct' : 'wrong';
  render();

}



function App() {
  return <AuthorQuiz {...state} 
  onAnswerSelected={onAnswerSelected}
  onContinue = {() => {
    state = resetState();
    render();
  }} />;
}

const AuthorWrapper = withRouter(({history}) => 
  <AddAuthorForm onAddAuthor={(author) => {
    authors.push(author);
    history.push('/');
  }} />
);


function render() {
  ReactDOM.render(
    <BrowserRouter>
      <Route exact path="/" component={App} />
      <Route path='/add' component={AuthorWrapper} />
    </BrowserRouter>,
    document.getElementById('root')
  );
}
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
 