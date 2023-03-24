import { useEffect, useState } from 'react';
import pageService from './services/Pages';
import Page from './components/Page';

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
      backgroundColor: '#394a41'
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
      marginLeft: 20
    },

    secondPage: {
      position: 'absolute',
      marginLeft: 630,
      marginTop: 20
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

  function goForward() {
    const prevPage = { ...secondPage };
    setFirstPage(prevPage);
    getSecondPage(secondPage.id + 1);
  };

  function goBack() {
    const prevPage = { ...firstPage };
    setSecondPage(prevPage);
    getFirstPage(firstPage.id - 1);
  };

  function showNewPage(newPage) {
    const prevPage = { ...firstPage };
    setFirstPage(prevPage);
    setSecondPage(newPage);
  };

  function createPage() {
    const today = new Date();
    const newPage = {
      "day": today.getDate(),
      "month": today.getMonth() + 1,
      "todos": [
        {
          "task": '',
          "completed": false,
          "id": 1
        },
        {
          "task": '',
          "completed": false,
          "id": 2
        },
        {
          "task": '',
          "completed": false,
          "id": 3
        }
      ],
      "events": [],
      "entry": "write something..."
    };

    pageService.create(newPage)
      .then(res => {
        getPageCount();
        showNewPage(res);
      });
  };

  function deletePage(id) {
    pageService.remove(id)
      .then(() => {
        getPageCount();
        goBack();
      });
  };

  function getPageCount() {
    pageService.pageCount()
      .then(res => {
        setPageCount(res);
      });
  };

  useEffect(() => {
    getPageCount();

    if (pageCount === 1) {
      getSecondPage(pageCount);
      setFirstPage({});
    } else if (pageCount > 1) {
      getSecondPage(pageCount);
      getFirstPage(pageCount - 1);
    };
  }, [pageCount]);

  return (
    <div style={appStyle.app}>
      <div style={appStyle.firstPage}>
        {firstPage !== {} ? <Page page={firstPage} pageService={pageService} setCurrentPage={setFirstPage} deletePage={deletePage} /> : null}
      </div>

      <div style={appStyle.secondPage}>
        {secondPage !== {} ? <Page page={secondPage} pageService={pageService} setCurrentPage={setSecondPage} deletePage={deletePage} /> : null}
      </div>

      <div style={appStyle.nav}>
        {firstPage.id > 1 ? <button style={appStyle.dir} onClick={goBack}>back</button> : <button style={{ ...appStyle.dir, cursor: 'default' }}>no more pages</button>}

        {secondPage.id < pageCount ? <button style={appStyle.dir} onClick={goForward}>forward</button> : <button onClick={createPage} style={appStyle.dir}>new page</button>}
      </div>
    </div>
  );
};

export default App;