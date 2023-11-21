import { NavLink } from 'react-router-dom';
import '../Home/Home.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../../features/user';

function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    search: '',
  });
  const [displayCount, setDisplayCount] = useState(20);

  const { search } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    dispatch(fetchData(search));
  };

  const handleShowMore = () => {
    setDisplayCount(prevDisplayCount => prevDisplayCount + 20);
  };

  return (
    <div className="app_main_block">
      <h1 className='h1'>Почти как CyberСпорт</h1>
      <input
        type="text"
        className="logIn_user_name_input"
        name="search"
        value={search}
        onChange={onChange}
        required
      />
      <button className="oncliocbutton" onClick={onSubmit} type="button">
        Найти
      </button>
      {user &&
      user.hits.hits.slice(0, displayCount).map((res, index) => (
        <div className="search_center" style={{ marginTop: '10px' }} key={index}>
          <p className="search_title">{res._source.Title}</p>
          <NavLink
            className="nav-link active text-white register_link"
            to={`/profile/${res._id}`}
            key={index}
          >
            Посмотреть
          </NavLink>
        </div>
      ))}
{user && user.hits.total.value > displayCount && (
  <button onClick={handleShowMore} className='showmore'>Показать еще</button>
)}
    </div>
  );
}

export default Home;
