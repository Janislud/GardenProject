import React from 'react';
import styles from './BreadCrumbs.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addBreadcrumb, removeBreadcrumb } from '../../slices/breadcrumbsSlice';

const BreadCrumbs = () => {
  const dispatch = useDispatch()
  const breadcrumbs = useSelector((state) => state.breadcrumbs.breadcrumbsList)
  
  const handleAddBreadcrumb = () => {
    const newBreadcrumb = `New Breadcrumb ${breadcrumbs.length + 1}`
    dispatch(addBreadcrumb(newBreadcrumb))
  }

  const handleRemoveBreadcrumb = () => {
    if (breadcrumbs.length > 0) {
      dispatch(removeBreadcrumb(breadcrumbs.length -1))
    }
  }

  return (
    <div className={styles.breadcrumbs-container}>
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={index} className={styles.breadcrumbs-block}>
          <div className={`breadcrumb ${index === breadcrumbs.length -1 ? 'active' : ''}`}>
          {breadcrumb}
          </div>
          {index !== breadcrumbslength -1 && <div className={styles.breadcrumb-line}></div>}
        </div>
      ))}
      <button onClick={handleAddBreadcrumb}>Add Breadcrumb</button>
      <button onClick={handleRemoveBreadcrumb}>Remove Breadcrumb</button>
      </div>
  )
}


export {BreadCrumbs} ;
