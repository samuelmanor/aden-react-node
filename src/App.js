// import './App.css';
import { useEffect, useState } from 'react';
import pageService from './services/Pages';
import Page from './components/Page';

// new Date ex. Fri Mar 17 2023 16:59:43 GMT-0400 (Eastern Daylight Time)
// creates as object
// getDate() => 17
// getMonth() + 1 because its 0-index => 3

function App() {
  const [currentPage, setCurrentPage] = useState({});
  const [pageCount, setPageCount] = useState(0);

  const appStyle = {
    app: {
      width: 800,
      height: 630,
      position: 'absolute',
      marginTop: 10,
      marginLeft: '25%',
      borderRadius: 15,
      backgroundColor: '#394a41',
    },

    nav: {
      position: 'absolute',
      // backgroundColor: 'red',
      display: 'flex',
      width: 600,
      height: 50,
      marginTop: 5,
      marginLeft: 20,
      fontSize: 25,
      gap: 20,
      justifyContent: 'space-evenly'
    },

    dir: {
      // position: 'absolute',
      // flexGrow: 1,
    },
  };

  function getPage(id) {
    pageService.getOne(id)
      .then(initialPage => {
        setCurrentPage(initialPage);
      });
  };

  function changePage(direction) {
    if (direction === 'forward') {
      const nextPageId = currentPage.id + 1;
      getPage(nextPageId);
    } else if (direction === 'back') {
      const nextPageId = currentPage.id - 1;
      getPage(nextPageId);
    };
  };

  useEffect(() => {
    pageService.pageCount()
      .then(initialCount => {
        setPageCount(initialCount);
        getPage(initialCount);
      }); 
  }, []);

  return (
    <div style={appStyle.app}>
      {currentPage ? <Page page={currentPage} pageService={pageService} setCurrentPage={setCurrentPage} /> : null}

      <div style={appStyle.nav}>
        {currentPage.id > 1 ? <p style={appStyle.dir} onClick={() => changePage('back')}>back</p> : null}
        <p style={appStyle.dir} >{currentPage.id}</p>
        {currentPage.id < pageCount ? <p style={appStyle.dir} onClick={() => changePage('forward')}>forward</p> : null}
      </div>
    </div>
  );
};

export default App;