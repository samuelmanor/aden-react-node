import './App.css';
import { useEffect, useState } from 'react';
import pageService from './services/Pages';
import Page from './components/Page';

/* crud
pages: (date, todo, events, entry, images)
 - create
 - read
 - update
 - destroy

todo:
 - create
 - read
 - update (whole page updates instead?)
 - destroy

events:
 - create
 - read
 - update (whole page updates instead?)
 - destroy

entry: (no create because it will automatically be created upon page creation, no delete because it's required)
 - read
 - update (whole page updates instead?)

images: (dont need update cause you should delete/create for new image, pages by default have "" for all image places)
 - create
 - read
 - destroy
*/

// new Date ex. Fri Mar 17 2023 16:59:43 GMT-0400 (Eastern Daylight Time)
// creates as object
// getDate() => 17
// getMonth() + 1 because its 0-index => 3

function App() {
  const [currentPage, setCurrentPage] = useState({});
  const [pageCount, setPageCount] = useState(0);

  const appStyle = {
    // backgroundColor: 'red'
  };

  function getPage(id) {
    pageService.getOne(id)
      .then(initialPage => {
        setCurrentPage(initialPage);
      });
  };

  useEffect(() => {
      pageService.pageCount()
        .then(initialCount => {
          setPageCount(initialCount);
          getPage(initialCount);
        });
  }, []);

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
      <Page page={currentPage} />

      <div>
        {currentPage.id > 1 ? <p onClick={() => changePage('back')}>back</p> : null}
        <p>{currentPage.id}</p>
        {currentPage.id < pageCount ? <p onClick={() => changePage('forward')}>forward</p> : null}
      </div>
    </div>
  );
};

export default App;