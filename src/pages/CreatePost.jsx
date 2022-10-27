import {useState} from "react";
import InputWithCaption from "../components/InputWithCaption";
import SubmitButton from "../components/SubmitButton";
import ResetButton from "../components/ResetButton";
import {posts} from "../utils/posts";
import ErrorMessage from "../components/ErrorMessage";

const CreatePost = () => {
    const [postData, setPostData] = useState({
        title: "",
        fullText: "",
        description: ""
    })
    const [postImg, setPostImg] = useState(null)
    const [error, setError] = useState(null)

    function changeImgHandler(e){
        setPostImg(e.target.files)
    }

    function clearForm(){
        window.location = '/'
    }

    async function sendForm(e){
        e.preventDefault()
        const newPostData = await posts.createPost(postData)
        if(newPostData.error){
            setError(newPostData.data)
        }
        else {
            if(postImg){
                await posts.updateImg(newPostData.data._id, postImg)
            }
            window.location = '/post/' + newPostData.data._id
        }
    }

    return (
        <form onSubmit={e=>sendForm(e)}>
            <div className="bg-neutral-100 rounded-3xl mx-auto border-gray-200 border-4 p-7 my-14 lg:w-4/5 w-full space-y-8 flex flex-col">
                <div>
                    <input type="file" onChange={e=>changeImgHandler(e)} accept="image/*" />
                </div>
                <InputWithCaption
                    type="text"
                    inputValue={postData.title}
                    caption="Title"
                    changeHandler={e=>setPostData({...postData, title: e.target.value})}
                />
                <InputWithCaption
                    type="text"
                    inputValue={postData.fullText}
                    caption="Full text"
                    changeHandler={e=>setPostData({...postData, fullText: e.target.value})}
                />
                <InputWithCaption
                    type="text"
                    inputValue={postData.description}
                    caption="Description"
                    changeHandler={e=>setPostData({...postData, description: e.target.value})}
                />
                <div className="w-44 flex justify-between">
                    <SubmitButton />
                    <ResetButton clickHandler={clearForm}/>
                </div>
                { error && <ErrorMessage message={error} /> }
            </div>
        </form>
    )
}

export default CreatePost