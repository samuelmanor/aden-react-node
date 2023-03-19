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
    width: 900,
    height: 640,
    position: 'absolute',
    marginTop: 10,
    marginLeft: '20%',
    borderRadius: 15,

    backgroundColor: '#394a41',
  };

  const navStyle = {
    display: 'absolute'
  };

  useEffect(() => {
    pageService.pageCount()
      .then(initialCount => {
        setPageCount(initialCount);
        getPage(initialCount);
      }); 
  }, []);

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

  return (
    <div style={appStyle}>
      {/* <button onClick={() => console.log(currentPage.id)}>console.log current page</button> */}
      {currentPage ? <Page page={currentPage} pageService={pageService} setCurrentPage={setCurrentPage} /> : null}

      <div style={navStyle}>
        {currentPage.id > 1 ? <p onClick={() => changePage('back')}>back</p> : null}
        <p>{currentPage.id}</p>
        {currentPage.id < pageCount ? <p onClick={() => changePage('forward')}>forward</p> : null}
      </div>
    </div>
  );
};

export default App;