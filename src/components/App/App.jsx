import { useEffect, useRef, useReducer } from 'react';
import { Api } from 'components/services/Api';
import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { SearchBar } from 'components/Searchbar/Searchbar';
import { INITIAL_STATE, STATUS, TYPE_KEYS } from 'constants/constants';
import css from './App.module.css';

const api = new Api();

export function App() {
  const [state, dispatch] = useReducer(galleryReducer, { ...INITIAL_STATE });
  const { page, query, images, error, loadBtnIsShown, status } = state;
  const galleryRef = useRef(null);

  useEffect(() => {
    if (!query) return;

    searchImages();

    async function searchImages() {
      dispatch({ type: TYPE_KEYS.pending });

      try {
        const images = await api.fetchImages(query, page);
        const totalImages = images.totalHits;

        if (!totalImages) {
          throw new Error(
            'There are no images found for your request. Please, try again'
          );
        }

        const remainingPages = getRemainingPages(totalImages);
        if (remainingPages > 0)
          dispatch({ type: TYPE_KEYS.loadBtnIsShown, payload: true });

        dispatch({
          type: TYPE_KEYS.resolved,
          payload: [...images.hits],
        });

        if (page > 1) smoothScroll();
      } catch (error) {
        dispatch({ type: TYPE_KEYS.error, payload: error });
      }
    }

    function getRemainingPages(totalImages) {
      return Math.ceil(totalImages / api.perPage) - page;
    }
  }, [page, query]);

  function smoothScroll() {
    setTimeout(() => {
      const { height: cardHeight } =
        galleryRef.current.firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 1.4,
        behavior: 'smooth',
      });
    }, 300);
  }

  const onFormSubmit = query => {
    dispatch({ type: TYPE_KEYS.submit, payload: query });
  };

  const onLoadBtnClick = () =>
    dispatch({ type: TYPE_KEYS.loadBtnClick, payload: 1 });

  return (
    <div className={css.app}>
      <SearchBar
        onSubmit={onFormSubmit}
        isSubmitting={status === STATUS.pending}
      />
      {status === STATUS.idle && (
        <p className={css.text}>Please, enter your request</p>
      )}
      {images.length > 0 && <ImageGallery images={images} ref={galleryRef} />}
      <Loader isLoading={status === STATUS.pending} />
      {loadBtnIsShown && <Button onClick={onLoadBtnClick}>Load More</Button>}
      {status === STATUS.rejected && (
        <p className={css.text}>{error.message}</p>
      )}
    </div>
  );
}

function galleryReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case TYPE_KEYS.submit:
      return { ...state, page: 1, images: [], query: payload };
    case TYPE_KEYS.pending:
      return { ...state, loadBtnIsShown: false, status: STATUS.pending };
    case TYPE_KEYS.resolved:
      return {
        ...state,
        images: [...state.images, ...payload],
        status: STATUS.resolved,
      };
    case TYPE_KEYS.error:
      return { ...state, error: payload, status: STATUS.rejected };
    case TYPE_KEYS.loadBtnIsShown:
      return { ...state, loadBtnIsShown: true };
    case TYPE_KEYS.loadBtnClick:
      return { ...state, page: state.page + payload };
    default:
      throw new Error(`Unsupported action type ${type}`);
  }
}

// export function App() {
//   const [page, setPage] = useState(1);
//   const [query, setQuery] = useState('');
//   const [images, setImages] = useState([]);
//   const [error, setError] = useState(null);
//   const [loadBtnIsShown, setLoadBtnIsShown] = useState(false);
//   const [status, setStatus] = useState(STATUS.idle);

//   const galleryRef = useRef(null);

//   useEffect(() => {
//     if (!query) return;

//     searchImages();

//     async function searchImages() {
//       setStatus(STATUS.pending);
//       setLoadBtnIsShown(false);

//       try {
//         const images = await api.fetchImages(query, page);
//         const totalImages = images.totalHits;

//         if (!totalImages) {
//           throw new Error(
//             'There are no images found for your request. Please, try again'
//           );
//         }

//         const remainingPages = getRemainingPages(totalImages);
//         if (remainingPages > 0) setLoadBtnIsShown(true);

//         setImages(prevImages => [...prevImages, ...images.hits]);
//         setStatus(STATUS.resolved);

//         if (page > 1) smoothScroll();
//       } catch (error) {
//         setError(error);
//         setStatus(STATUS.rejected);
//       }
//     }

//     function getRemainingPages(totalImages) {
//       return Math.ceil(totalImages / api.perPage) - page;
//     }
//   }, [query, page]);

//   function smoothScroll() {
//     setTimeout(() => {
//       const { height: cardHeight } =
//         galleryRef.current.firstElementChild.getBoundingClientRect();

//       window.scrollBy({
//         top: cardHeight * 1.8,
//         behavior: 'smooth',
//       });
//     }, 300);
//   }

//   const onFormSubmit = query => {
//     setPage(1);
//     setQuery(query);
//     setImages([]);
//   };

//   return (
//     <div className={css.app}>
//       <SearchBar
//         onSubmit={onFormSubmit}
//         isSubmitting={status === STATUS.pending}
//       />
//       {status === STATUS.idle && (
//         <p className={css.text}>Please, enter your request</p>
//       )}
//       {images.length > 0 && <ImageGallery images={images} ref={galleryRef} />}
//       <Loader isLoading={status === STATUS.pending} />
//       {loadBtnIsShown && (
//         <Button onClick={() => setPage(prevPage => prevPage + 1)}>
//           Load More
//         </Button>
//       )}
//       {status === STATUS.rejected && (
//         <p className={css.text}>{error.message}</p>
//       )}
//     </div>
//   );
// }
