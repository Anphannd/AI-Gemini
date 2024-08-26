import PropType from 'prop-types';
import Img1 from '../assets/plusIcon.png';
import Img2 from '../assets/chat.png';
import Img3 from '../assets/remove.png';
import Img6 from '../assets/menu.png';
import { useDispatch, useSelector } from 'react-redux';
import { addChat, removeChat } from '../store/chatSlile';
import { Link, useNavigate } from 'react-router-dom';
const Silebar = ({ onToggle }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data } = useSelector((state) => state.chat);
    const onHandleNewChat = () => {
        dispatch(addChat());
    };
    const onHandleRemoveChat = (id) => {
        dispatch(removeChat(id));
        navigate('/');
    };
    return (
        <div className="bg-sideBar h-screen w-[280px] p-8">
            <button className="float-right xl:hidden " onClick={onToggle}>
                <img src={Img6} alt="Img6" className="w-6 h-6" />
            </button>
            <div className="mt-20">
                <button
                    className="flex items-center gap-4 p-4 py-2 mb-32 text-white bg-slate-500 rounded-3xl"
                    onClick={onHandleNewChat}
                >
                    <img src={Img1} alt="Img1" className="w-4 h-4" />
                    <p>Cuộc trò truyện mới</p>
                </button>
                <div className="space-y-4 text-white">
                    <span>Gần đây:</span>
                    <div className="flex flex-col space-y-6">
                        {data.map((item) => (
                            <Link
                                to={`/chat/${item.id}`}
                                key={item?.id}
                                className="flex items-center justify-between p-4 py-2 bg-slate-500 rounded-3xl"
                            >
                                <div className="flex items-center gap-2">
                                    <img src={Img2} alt="Img2" className="w-8 h-8" />
                                    <span>{item.title}</span>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onHandleRemoveChat(item.id);
                                    }}
                                >
                                    <img src={Img3} alt="Img3" className="w-8 h-8" />
                                </button>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
Silebar.propTypes = {
    onToggle: PropType.func,
};
export default Silebar;
