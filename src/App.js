// import './App.css';
import { useEffect, useState } from 'react';
import pageService from './services/Pages';
import Page from './components/Page';

// new Date ex. Fri Mar 17 2023 16:59:43 GMT-0400 (Eastern Daylight Time)
// creates as object
// getDate() => 17
// getMonth() + 1 because its 0-index => 3

function App() {
  const [pageCount, setPageCount] = useState(0);
  const [firstPage, setFirstPage] = useState({});
  const [secondPage, setSecondPage] = useState({});

  const appStyle = {
    app: {
      width: 1250,
      height: 630,
      position: 'absolute',
      marginTop: 10,
      marginLeft: '8%',
      borderRadius: 15,
      backgroundColor: '#394a41',
    },

    nav: {
      position: 'absolute',
      display: 'flex',
      width: 600,
      height: 50,
      marginTop: 625,
      marginLeft: 350,
      justifyContent: 'space-evenly'
    },

    dir: {
      cursor: 'pointer',
      border: 'none',
      backgroundColor: 'transparent',
      fontSize: 25
    },

    firstPage: {
      position: 'absolute',
      marginTop: 20,
      marginLeft: 20,
    },

    secondPage: {
      position: 'absolute',
      marginLeft: 630,
      marginTop: 20,
    }
  };

  function getFirstPage(id) {
    pageService.getOne(id)
      .then(initialPage => {
        setFirstPage(initialPage);
      });
  };

  function getSecondPage(id) {
    pageService.getOne(id)
      .then(initialPage => {
        setSecondPage(initialPage);
      });
  };

  function changePages(direction) {
    if (direction === 'forward') {
      const prevPage = { ...secondPage };
      setFirstPage(prevPage);
      getSecondPage(secondPage.id + 1);
    } else if (direction === 'back') {
      const prevPage = { ...firstPage };
      setSecondPage(prevPage);
      getFirstPage(firstPage.id - 1);
    };
  };

  useEffect(() => {
    pageService.pageCount()
      .then(initialCount => {
        setPageCount(initialCount);

        if (pageCount === 1) {
          getSecondPage(pageCount);
          setFirstPage({});
        } else if (pageCount > 1) {
          getSecondPage(pageCount);
          getFirstPage(pageCount - 1);
        };
      }); 
  }, [pageCount]);

  return (
    <div style={appStyle.app}>
      <div style={appStyle.firstPage}>
        {firstPage !== {} ? <Page page={firstPage} pageService={pageService} setCurrentPage={setFirstPage} /> : null}
      </div>

      <div style={appStyle.secondPage}>
        {secondPage !== {} ? <Page page={secondPage} pageService={pageService} setCurrentPage={setSecondPage} /> : null}
      </div>

      <div style={appStyle.nav}>
        {firstPage.id > 1 ? <button style={appStyle.dir} onClick={() => changePages('back')}>back</button> : <button style={{ ...appStyle.dir, cursor: 'default' }}>no more pages</button>}

        {secondPage.id < pageCount ? <button style={appStyle.dir} onClick={() => changePages('forward')}>forward</button> : <button style={appStyle.dir}>create new</button>}
      </div>
    </div>
  );
};

export default App;