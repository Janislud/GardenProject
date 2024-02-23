import React, { useEffect } from "react";
import style from "./BreadCrumbs.module.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBreadcrumb, removeBreadcrumb, setBreadcrumbs } from "../../slices/breadcrumbsSlice";

const BreadCrumbs = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const breadcrumbs = useSelector((state) => state.breadcrumbs.breadcrumbsList);

   // Обновляет хлебные крошки в зависимости от текущего маршрута
   useEffect(() => {
    const pathnames = location.pathname.split('/').filter(x => x);
    const newBreadcrumbs = pathnames.map((pathname, index) => {
      return `Breadcrumb for ${pathname}`;
    });
    // Очищает текущие хлебные крошки и добавить новые в зависимости от маршрута
    dispatch(setBreadcrumbs(newBreadcrumbs));
  }, [location, dispatch]);

  const handleAddBreadcrumb = () => {
    const newBreadcrumb = `New Breadcrumb ${breadcrumbs.length + 1}`;
    dispatch(addBreadcrumb(newBreadcrumb));
  };

  const handleRemoveBreadcrumb = () => {
    if (breadcrumbs.length > 0) {
      dispatch(removeBreadcrumb(breadcrumbs.length - 1));
    }
  };

  return (
    <div className={style.buttonWrapper}>
      <Link to="/">
        <button className={style.mainPageBtn}>Main page</button>
      </Link>
      <div className={style.lineDiv}></div>

      <button className={style.categoreisBtn}>Categories</button>
      <div>
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={index}>{breadcrumb}</div>
        ))}
      </div>
    </div>
  );
};

export { BreadCrumbs };

{
  /* <div className={styles.breadcrumbs_container}>
{breadcrumbs.map((breadcrumb, index) => (
  <div key={index} className={styles.breadcrumbs_block}>
    <div className={`breadcrumb ${index === breadcrumbs.length -1 ? 'active' : ''}`}>
    {breadcrumb}
    </div>
    {index !== breadcrumbslength -1 && <div className={styles.breadcrumb_line}></div>}
  </div>
))}
<button onClick={handleAddBreadcrumb}>Add Breadcrumb</button>
<button onClick={handleRemoveBreadcrumb}>Remove Breadcrumb</button>
</div> */
}
