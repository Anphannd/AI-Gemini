import { useState, useEffect, useRef } from 'react';
import Img4 from '../assets/menu.png';
import Img5 from '../assets/temp.jpeg';
import Img6 from '../assets/star.png';
import Silebar from '../components/Silebar';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Gemini from '../gemini';
import { addMessage, setName } from '../store/chatSlile';
const ChatDetail = () => {
    const [menuToggle, setMenuToggle] = useState(true);
    const [dataDetail, setDataDetail] = useState([]);
    const [newChat, setNewChat] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const ref = useRef();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.chat);
    useEffect(() => {
        if (data.length > 0) {
            const chat = data.find((chat) => chat.id === id);
            if (chat) {
                setNewChat(chat);
                setDataDetail(chat.messages);
                setInputValue('');
                ref.current.focus();
            }
        }
    }, [data, id]);
    const handleCHatDetail = async () => {
        if (id) {
            const res = await Gemini(inputValue, dataDetail);
            if (newChat.title === 'chat') {
                const promptName = `This is a new chat, and user ask about ${inputValue}. No rely and comment just give me a name for this chat, Max length is 10 characters`;
                const newTitle = await Gemini(promptName);
                dispatch(setName({ newTitle, chatId: id }));
            }
            if (res) {
                const dataMessage = {
                    idChat: id,
                    userMess: inputValue,
                    botMess: res,
                };
                dispatch(addMessage(dataMessage));
            }
        }
    };
    return (
        <div className="p-4 text-white xl:w-[80%] w-full relative">
            <div className="flex items-center gap-2">
                <button onClick={() => setMenuToggle(!menuToggle)}>
                    <img src={Img4} alt="Img4" className="w-6 h-6 xl:hidden" />
                </button>
                <h1 className="text-xl font-extrabold">GEMINI</h1>
            </div>
            {menuToggle && (
                <div className="absolute top-0 left-0 h-full xl:hidden">
                    <Silebar onToggle={() => setMenuToggle(!menuToggle)} />
                </div>
            )}
            <div className=" max-w-[90%] mx-auto w-full mt-20 space-y-20 ">
                {id ? (
                    <div className="flex flex-col gap-4 h-[400px] p-4  overflow-x-hidden overflow-y-auto">
                        {Array.isArray(dataDetail) &&
                            dataDetail?.map((item) => (
                                <div className="flex items-center gap-4" key={item.id}>
                                    {item.isBot ? (
                                        <>
                                            <img src={Img6} alt="Img6" className="w-8 h-8" />
                                            <p dangerouslySetInnerHTML={{ __html: item.text }} />
                                        </>
                                    ) : (
                                        <>
                                            <span>user</span>
                                            <span>{item.text}</span>
                                        </>
                                    )}
                                </div>
                            ))}
                    </div>
                ) : (
                    <div className="flex flex-col space-y-20">
                        <div className="space-y-1">
                            <h2 className="inline-block text-3xl font-bold text-transparent bg-gradient-to-r from-blue-300 via-green-700 to-yellow-600 bg-clip-text">
                                Xin Chào
                            </h2>
                            <p className="text-xl">Hôm nay tôi có thể giúp gì cho bạn.</p>
                        </div>
                        <div className="flex items-center justify-center space-x-3">
                            <div className="w-[200px] h-[200px] bg-slate-500 flex justify-center rounded-md items-center">
                                <span>Lên kế hoạch bữa ăn</span>
                            </div>
                            <div className="w-[200px] h-[200px] bg-slate-500 flex justify-center rounded-md items-center">
                                <span>Cụm từ ngôn ngữ mới</span>
                            </div>
                            <div className="w-[200px] h-[200px] bg-slate-500 flex justify-center rounded-md items-center">
                                <span>Bí quyết viết thư xin việc</span>
                            </div>
                            <div className="w-[200px] h-[200px] bg-slate-500 flex justify-center rounded-md items-center  flex-col">
                                <span>Tạo hình ảnh với AI</span>
                                <img src={Img5} alt="temp" className="w-[150px] h-[150px]" />
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex items-center w-full space-x-4 ">
                    <input
                        ref={ref}
                        value={inputValue}
                        type="text"
                        placeholder="Nhập câu lệnh tại đây..."
                        className="p-4 rounded-lg bg-default w-[90%] border outline-none"
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button className="p-4 text-white bg-green-500 rounded-lg" onClick={handleCHatDetail}>
                        Gửi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatDetail;
