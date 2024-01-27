
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
//import { setSort } from '@/app/store/slices/filterSlice';

export const sortList = [
  { name: 'date posted', sortProperty: 'date posted' }, 
  { name: 'salary', sortProperty: 'salary' },
  { name: 'title', sortProperty: 'title' }
];

export default function Sort ({orderSort, onClickOrder}) {
 // const sort = useSelector(state => state.filter.sort);
  const sort = 'asc';
  const sortRef = useRef(null);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  
  const orderName = ['asc', 'desc'];


  const onClickListItem = (obj) => {
   dispatch(setSort(obj))
    setOpen(false)
  }

  const onClickOrderList = (i) => {
   onClickOrder(i);
    setOpenOrder(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      const path = event.composedPath()

      if (!path.includes(sortRef.current)) {
        setOpen(false);
        setOpenOrder(false);
      }
   } 

    document.body.addEventListener('click', handleClickOutside);

    return () => {document.body.addEventListener('click', handleClickOutside);}
    
    
  }, [])

  return (
    <div className="sort">
        <div ref={sortRef} className="sort">
        <div className="sort__label">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
          <b>Сортировка по:</b>
          <div className='flex gap '>
            <span className='mr4' onClick={() => setOpen(!open)}>{sort.sortProperty} </span>
            <span className='mr4'  onClick={() => setOpenOrder(!openOrder)}>{orderSort}</span>
          </div>
          
        </div>
        {open && (
            <div className="sort__popup sort__popupFirst">
              <ul>
                {sortList.map((obj, i) => (
                  <li
                    key={i}
                    onClick={() => onClickListItem(obj)}
                    className={sort.sortProperty === obj.sortProperty ? "active" : ""}
                  >
                    {obj.name} 
                  </li>
                ))}
              </ul>
            </div>
          )}


        {openOrder &&  <div className="sort__popup ">
          <ul>
          {orderName.map((name, i) => (
        <li key={i} onClick={() => onClickOrderList(name)} className={orderSort === name ? "active" : ""}>{name}</li>
          ))}
          </ul>
        </div> }
       
      </div>
    </div>
  );
}