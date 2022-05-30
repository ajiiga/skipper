import React, { useEffect, useMemo, useState } from "react";
import s from "./CatalogSliderBlock.module.css";
import CatalogLinkSearch from "./CatalogLinkSearch/CatalogLinkSearch";
import { Link } from "react-router-dom";
import arrow from "../../../../../../static/img/Catalog/arrow.svg";

const CatalogSliderBlock = ({ activeThemes }) => {
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  let countShowBlocks = width >= 500 ? 3 : 1;
  let [page, setPage] = useState(1);

  useEffect(() => {
    setPage(0);
  }, [activeThemes]);

  let showThemes = useMemo(() => {
    return activeThemes.slice(page, page + countShowBlocks);
  }, [activeThemes, page]);

  let nextPage = () => {
    setPage(page + 1);
  };
  let prevPage = () => {
    setPage(page - 1);
  };

  return (
    <div className={s.container}>
      <img
        src={arrow}
        alt=""
        className={s.prev}
        style={page === 0 ? { visibility: "hidden" } : {}}
        onClick={() => prevPage()}
      />
      <div className={s.items_container}>
        {showThemes.map((t) => (
          <div className={s.block} key={t.ID}>
            <div className={s.title}>{t.name2}</div>
            {t["Child2"].map((x) => (
              <CatalogLinkSearch key={x.ID} name={x.name3} count={x.count} />
            ))}
          </div>
        ))}
      </div>
      <img
        src={arrow}
        alt=""
        className={s.next}
        style={
          page + countShowBlocks >= activeThemes.length
            ? { visibility: "hidden" }
            : {}
        }
        onClick={() => nextPage()}
      />
    </div>
  );
};

export default CatalogSliderBlock;
