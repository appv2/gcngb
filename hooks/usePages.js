import { useReducer } from "react";
import { isMobile } from "react-device-detect";
import {
  rotatePageLeft,
  rotatePageRight,
  updatePagesOrder,
} from "../helpers/utils.js";

const initialState = {
  pages: [],
  hoverIndex: -1,
  insertIndex: -1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_PAGES":
      let newPages = state.pages.concat([action.newPage]);
      newPages = updatePagesOrder(newPages);
      return {
        ...state,
        pages: newPages,
      };

    case "UPDATE_PAGES":
      return {
        ...state,
        pages: action.newPages,
      };

    case "CLEAR_SELECTION":
      const newPagesAfterClearingAllSelection = state.pages.map((page) => {
        return { ...page, selected: false };
      });
      return {
        ...state,
        pages: newPagesAfterClearingAllSelection,
      };

    case "SELECT_PAGE":
      const newSelectedPage = action.newSelectedPage;
      const newPagesAfterSelection = state.pages.map((page) => {
        if (newSelectedPage.id === page.id) {
          return { ...page, selected: true };
        } else {
          return page;
        }
      });
      return {
        ...state,
        pages: newPagesAfterSelection,
      };

    case "REMOVE_SELECT_PAGE":
      const newUnselectedPage = action.newUnselectedPage;
      const newPagesAfterDeSelectingPage = state.pages.map((page) => {
        if (newUnselectedPage.id === page.id) {
          return { ...page, selected: false };
        } else {
          return page;
        }
      });
      return {
        ...state,
        pages: newPagesAfterDeSelectingPage,
      };

    case "SET_INSERTINDEX":
      return {
        ...state,
        hoverIndex: action.hoverIndex,
        insertIndex: action.insertIndex,
      };

    case "RESET_INITIAL_STATE":
      return initialState;

    default:
      return state;
  }
};

const usePages = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAddPage = (addedPage) => {
    dispatch({
      type: "ADD_PAGES",
      newPage: addedPage,
    });
  };

  const handleRotatePageRight = (id) => {
    const pages = state.pages;
    let newPages = pages.map((page) => {
      if (page.id === id) {
        const newRotation = rotatePageRight(page.degree);
        return { ...page, degree: newRotation, selected: true };
      } else {
        return { ...page, selected: false };
      }
    });

    dispatch({
      type: "UPDATE_PAGES",
      newPages: newPages,
    });
  };

  const handleRotatePageLeft = (id) => {
    const pages = state.pages;
    let newPages = pages.map((page) => {
      if (page.id === id) {
        const newRotation = rotatePageLeft(page.degree);
        return { ...page, degree: newRotation, selected: true };
      } else {
        return { ...page, selected: false };
      }
    });

    dispatch({
      type: "UPDATE_PAGES",
      newPages: newPages,
    });
  };

  const handleRotateSelectedPagesToRight = () => {
    const pages = state.pages;
    //check if no page is selected
    const selectedPagesLength = pages.filter(
      (page) => page.selected === true
    ).length;

    let newPages;
    //if selected pages exist rotate only selected pages, else rotate all the pages
    if (selectedPagesLength > 0) {
      newPages = pages.map((page) => {
        if (page.selected === true) {
          const newRotation = rotatePageRight(page.degree);
          return { ...page, degree: newRotation };
        } else {
          return page;
        }
      });
    } else {
      newPages = pages.map((page) => {
        const newRotation = rotatePageRight(page.degree);
        return { ...page, degree: newRotation };
      });
    }

    dispatch({
      type: "UPDATE_PAGES",
      newPages: newPages,
    });
  };

  const rotateSelectedPagesToLeft = () => {
    const pages = state.pages;
    //check if no page is selected
    const selectedPagesLength = pages.filter(
      (page) => page.selected === true
    ).length;

    let newPages;
    //if selected pages exist rotate only selected pages, else rotate all the pages
    if (selectedPagesLength > 0) {
      newPages = pages.map((page) => {
        if (page.selected === true) {
          const newRotation = rotatePageLeft(page.degree);
          return { ...page, degree: newRotation };
        } else {
          return page;
        }
      });
    } else {
      newPages = pages.map((page) => {
        const newRotation = rotatePageLeft(page.degree);
        return { ...page, degree: newRotation };
      });
    }

    dispatch({
      type: "UPDATE_PAGES",
      newPages: newPages,
    });
  };

  const handleDeleteSelectedPages = () => {
    const pages = state.pages;
    let newPages = pages.filter((page) => page.selected === false);
    newPages = updatePagesOrder(newPages);

    dispatch({
      type: "UPDATE_PAGES",
      newPages: newPages,
    });
  };

  const handleSetInsertIndex = (hoverIndex, newInsertIndex) => {
    if (
      state.hoverIndex === hoverIndex &&
      state.insertIndex === newInsertIndex
    ) {
      return;
    }
    dispatch({
      type: "SET_INSERTINDEX",
      hoverIndex: hoverIndex,
      insertIndex: newInsertIndex,
    });
  };

  const handleRemovePageSelection = (index) => {
    const pages = state.pages;
    const page = index < 0 ? "" : pages[index];

    dispatch({
      type: "REMOVE_SELECT_PAGE",
      newUnselectedPage: page,
    });
  };

  const handleClearPageSelection = () => {
    dispatch({ type: "CLEAR_SELECTION" });
  };

  const handleResetInitialPagesstate = () => {
    dispatch({ type: "RESET_INITIAL_STATE" });
  };

  const handlePageSelection = (index) => {
    const pages = state.pages;
    const page = index < 0 ? "" : pages[index];

    dispatch({
      type: "SELECT_PAGE",
      newSelectedPage: page,
    });
  };

  const handlePagesSelection = (index, ctrlKey) => {
    const pages = state.pages;
    const page = index < 0 ? "" : pages[index];
    if (isMobile) {
      if (page.selected === true) {
        handleRemovePageSelection(index);
      } else {
        handlePageSelection(index);
      }
    } else {
      if (!ctrlKey) {
        handleClearPageSelection();
        handlePageSelection(index);
      } else {
        if (page.selected === true) {
          handleRemovePageSelection(index);
        } else {
          handlePageSelection(index);
        }
      }
    }
  };
  const handleRearrangePages = (dragItem) => {
    let pages = state.pages.slice();
    const draggedPages = dragItem.pages;
    let dividerIndex;
    if ((state.insertIndex >= 0) & (state.insertIndex < pages.length)) {
      dividerIndex = state.insertIndex;
    } else {
      dividerIndex = pages.length;
    }
    const upperHalfRemainingPages = pages
      .slice(0, dividerIndex)
      .filter((c) => !draggedPages.find((dc) => dc.id === c.id));
    const lowerHalfRemainingPages = pages
      .slice(dividerIndex)
      .filter((c) => !draggedPages.find((dc) => dc.id === c.id));
    let newPages = [
      ...upperHalfRemainingPages,
      ...draggedPages,
      ...lowerHalfRemainingPages,
    ];

    newPages = updatePagesOrder(newPages);

    dispatch({
      type: "UPDATE_PAGES",
      newPages: newPages,
      newSelectedPages: draggedPages,
    });
  };

  const handleDeletePage = (id) => {
    const pages = state.pages;
    let newPages = pages.filter((page) => !(id === page.id));
    newPages = updatePagesOrder(newPages);

    dispatch({
      type: "UPDATE_PAGES",
      newPages: newPages,
    });
  };

  return {
    pages: state.pages,
    hoverIndex: state.hoverIndex,
    insertIndex: state.insertIndex,
    handleAddPage,
    handleRotatePageRight,
    handleRotatePageLeft,
    handleRotateSelectedPagesToRight,
    rotateSelectedPagesToLeft,
    handleDeleteSelectedPages,
    handleSetInsertIndex,
    handleRemovePageSelection,
    handleClearPageSelection,
    handlePageSelection,
    handlePagesSelection,
    handleRearrangePages,
    handleDeletePage,
    handleResetInitialPagesstate,
  };
};

export default usePages;
