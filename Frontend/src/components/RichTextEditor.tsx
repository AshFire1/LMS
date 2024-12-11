import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function RichTextEditor({input,setInput}:any) {
    const handleChange=(content:any)=>{
        setInput({...input,description:content})
    }
  return <ReactQuill theme="snow" value={input.description} onChange={handleChange} />;
}
export default RichTextEditor